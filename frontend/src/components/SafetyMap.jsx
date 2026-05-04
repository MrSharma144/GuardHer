import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import {
  Loader2, Navigation, AlertTriangle,
  ShieldAlert, X, MapPin, Database, Brain
} from 'lucide-react';
import { api } from '../services/api';

const libraries = ['visualization'];

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1.5rem' };
const defaultCenter     = { lat: 28.6139, lng: 77.2090 };

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: 'geometry',            stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke',  stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill',    stylers: [{ color: '#746855' }] },
    { featureType: 'administrative',      elementType: 'geometry.stroke', stylers: [{ color: '#17263c' }] },
    { featureType: 'road',                elementType: 'geometry',        stylers: [{ color: '#38414e' }] },
    { featureType: 'road',                elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road',                elementType: 'labels.text.fill',stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'water',               elementType: 'geometry',        stylers: [{ color: '#17263c' }] },
    { featureType: 'poi',                 elementType: 'geometry',        stylers: [{ color: '#283d6a' }] },
    { featureType: 'transit',             elementType: 'geometry',        stylers: [{ color: '#2f3948' }] },
  ],
};

// ── Haversine distance (metres) ───────────────────────────────────────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Zone → visual style ───────────────────────────────────────────────────────
const ZONE_STYLE = {
  GREEN:  { fill: '#22c55e', label: 'Safe Zone',     opacity: 0.15 },
  ORANGE: { fill: '#f97316', label: 'Moderate Risk', opacity: 0.18 },
  RED:    { fill: '#ef4444', label: 'Danger Zone',   opacity: 0.22 },
};

// Community review rating → zone
const RATING_TO_ZONE = {
  very_safe:      'GREEN',
  safe:           'GREEN',
  moderate:       'ORANGE',
  high_risk:      'RED',
  very_high_risk: 'RED',
};

const RATING_SCORE = {
  very_safe: 1,
  safe: 2,
  moderate: 3,
  high_risk: 4,
  very_high_risk: 5,
};

const getAverageZone = (avgScore) => {
  if (avgScore <= 2.5) return 'GREEN';
  if (avgScore <= 3.5) return 'ORANGE';
  return 'RED';
};

const clusterReviews = (reviewsList) => {
  const CLUSTER_RADIUS = 200; // metres — group reviews within 200m
  const clusters = [];

  for (const review of reviewsList) {
    if (!review.latitude || !review.longitude) continue;
    let added = false;
    
    for (const cluster of clusters) {
      const dist = haversine(review.latitude, review.longitude, cluster.lat, cluster.lng);
      if (dist < CLUSTER_RADIUS) {
        cluster.reviews.push(review);
        // Recalculate average lat/lng (simple average)
        cluster.lat = ((cluster.lat * (cluster.reviews.length - 1)) + review.latitude) / cluster.reviews.length;
        cluster.lng = ((cluster.lng * (cluster.reviews.length - 1)) + review.longitude) / cluster.reviews.length;
        
        // Recalculate average risk score
        const totalScore = cluster.reviews.reduce((sum, r) => sum + (RATING_SCORE[r.safety_rating] || 3), 0);
        cluster.avgScore = totalScore / cluster.reviews.length;
        
        added = true;
        break;
      }
    }
    
    if (!added) {
      clusters.push({
        id: `cluster_${review.id}`,
        lat: review.latitude,
        lng: review.longitude,
        reviews: [review],
        avgScore: RATING_SCORE[review.safety_rating] || 3
      });
    }
  }
  return clusters;
};

const ALERT_RADIUS = 500;   // metres — geofence trigger distance

// ─────────────────────────────────────────────────────────────────────────────
const SafetyMap = ({ onDangerZoneAlert }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [map,            setMap]           = useState(null);
  const [userLocation,   setUserLocation]  = useState(null);
  const [reviews,        setReviews]       = useState([]);      // Community reviews
  const [crimeZones,     setCrimeZones]    = useState([]);      // ML dataset cities
  const [mlGrid,         setMlGrid]        = useState([]);      // ML grid predictions
  const [heatmapData,    setHeatmapData]   = useState([]);
  const [heatmapLayer,   setHeatmapLayer]  = useState(null);
  const [prediction,     setPrediction]    = useState(null);    // single-point ML result
  const [activeAlert,    setActiveAlert]   = useState(null);
  const [dismissed,      setDismissed]     = useState(false);
  const [selectedPin,    setSelectedPin]   = useState(null);    // info popup
  const [activeLayer,    setActiveLayer]   = useState('all');   // 'all' | 'dataset' | 'community' | 'ml'
  const [mlGridLoading,  setMlGridLoading] = useState(false);
  const alertCooldown = useRef({});

  // ── 1. Community area reviews ───────────────────────────────────────────────
  useEffect(() => {
    api.get('/reviews/')
      .then(d => setReviews(d.filter(r => r.latitude && r.longitude)))
      .catch(() => {});
  }, []);

  // ── 2. ML dataset city crime zones ─────────────────────────────────────────
  useEffect(() => {
    api.get('/emergency/crime-zones/')
      .then(d => setCrimeZones(d))
      .catch(() => {});
  }, []);

  // ── 3. Heatmap backdrop ─────────────────────────────────────────────────────
  useEffect(() => {
    api.get('/locations/heatmap-data/')
      .then(d => setHeatmapData(d))
      .catch(() => {});
  }, []);

  // ── 4. Watch user position + proximity check ────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        checkProximity(loc);
      },
      err => console.warn('Geo error:', err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 30000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, crimeZones]);

  // ── 5. Single-point ML prediction (for user's exact location) ──────────────
  useEffect(() => {
    if (!userLocation) return;
    api.get(`/emergency/predict-zone/?latitude=${userLocation.lat}&longitude=${userLocation.lng}`)
      .then(d => setPrediction(d))
      .catch(() => {});
  }, [userLocation]);

  // ── 6. ML grid around user (fetch once when location is known) ──────────────
  useEffect(() => {
    if (!userLocation || mlGrid.length > 0) return;
    setMlGridLoading(true);
    api.get(`/emergency/ml-grid/?latitude=${userLocation.lat}&longitude=${userLocation.lng}&step=0.08&grid_size=7`)
      .then(d => setMlGrid(d))
      .catch(() => {})
      .finally(() => setMlGridLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  // ── 7. Heatmap layer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !map || heatmapData.length === 0 || !window.google) return;
    if (heatmapLayer) heatmapLayer.setMap(null);
    const pts = heatmapData.map(pt => ({
      location: new window.google.maps.LatLng(pt.lat, pt.lng),
      weight: pt.intensity,
    }));
    const layer = new window.google.maps.visualization.HeatmapLayer({
      data: pts, radius: 35,
      gradient: ['rgba(0,0,0,0)', 'rgba(34,197,94,0.8)', 'rgba(249,115,22,1)', 'rgba(239,68,68,1)'],
    });
    
    // Set layer on map only if activeLayer is 'all'
    if (activeLayer === 'all') {
      layer.setMap(map);
    }
    setHeatmapLayer(layer);
    
    return () => layer.setMap(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map, heatmapData]);

  // Handle heatmap visibility when activeLayer changes
  useEffect(() => {
    if (heatmapLayer) {
      if (activeLayer === 'all') {
        heatmapLayer.setMap(map);
      } else {
        heatmapLayer.setMap(null);
      }
    }
  }, [activeLayer, heatmapLayer, map]);

  // ── Proximity check ─────────────────────────────────────────────────────────
  const checkProximity = useCallback((loc) => {
    const dangerSources = [
      // Community reviews (clustered)
      ...clusterReviews(reviews)
        .filter(c => getAverageZone(c.avgScore) === 'RED')
        .map(c => ({ 
          id: c.id, 
          name: c.reviews.length === 1 ? c.reviews[0].area_name : `${c.reviews.length} Reviews Area`, 
          lat: c.lat, 
          lng: c.lng, 
          rating: 'high_risk', 
          source: 'community' 
        })),
      // Dataset cities
      ...crimeZones
        .filter(c => c.zone === 'RED')
        .map(c => ({ id: `city_${c.city}`, name: c.city, lat: c.latitude, lng: c.longitude, rating: 'high_risk', source: 'dataset', crimes: c.total_crimes })),
    ];

    const now = Date.now();
    for (const src of dangerSources) {
      const dist = haversine(loc.lat, loc.lng, src.lat, src.lng);
      if (dist < ALERT_RADIUS) {
        const last = alertCooldown.current[src.id] || 0;
        if (now - last < 60_000) continue;
        alertCooldown.current[src.id] = now;

        const alert = { ...src, distance: Math.round(dist) };
        setActiveAlert(alert);
        setDismissed(false);
        onDangerZoneAlert?.(alert);

        // Native notification
        if (Notification.permission === 'granted') {
          new Notification('⚠️ GuardHer Safety Alert', {
            body: `You are entering "${src.name}" — a high-risk area (${Math.round(dist)}m away). Stay alert!`,
            icon: '/favicon.ico',
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(p => {
            if (p === 'granted') new Notification('⚠️ GuardHer Safety Alert', {
              body: `You are entering "${src.name}" — a high-risk area. Stay alert!`,
              icon: '/favicon.ico',
            });
          });
        }
        break;
      }
    }
  }, [reviews, crimeZones, onDangerZoneAlert]);

  const centerOnUser = () => { if (map && userLocation) { map.panTo(userLocation); map.setZoom(13); } };
  const onLoad    = useCallback(m => setMap(m),  []);
  const onUnmount = useCallback(() => setMap(null), []);

  // ── Should we show each layer? ──────────────────────────────────────────────
  const showDataset   = activeLayer === 'all' || activeLayer === 'dataset';
  const showCommunity = activeLayer === 'all' || activeLayer === 'community';
  const showMlGrid    = activeLayer === 'all' || activeLayer === 'ml';

  // Clear selected pin when changing layers to make it highly interactive
  const handleLayerChange = (key) => {
    setActiveLayer(key);
    setSelectedPin(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  if (loadError) return (
    <div className="bg-midnight border border-charcoal rounded-3xl h-full flex flex-col items-center justify-center text-center p-8">
      <AlertTriangle className="text-coral mb-4" size={48} />
      <h3 className="text-xl font-bold text-offwhite">Map Error</h3>
      <p className="text-offwhite/60">Missing or invalid Google Maps API Key.</p>
    </div>
  );

  if (!isLoaded) return (
    <div className="bg-midnight border border-charcoal rounded-3xl h-full flex items-center justify-center p-8">
      <Loader2 className="animate-spin text-lavender w-10 h-10" />
    </div>
  );

  return (
    <div className="space-y-3">
      {/* ── Layer toggle pills ── */}
      <div className="flex flex-wrap gap-2 px-1">
        {[
          { key: 'all',       label: 'All Layers',         icon: null },
          { key: 'dataset',   label: 'ML Dataset Cities',  icon: <Database size={12} /> },
          { key: 'community', label: 'Community Reviews',  icon: <MapPin size={12} /> },
          { key: 'ml',        label: 'ML Grid Prediction', icon: <Brain size={12} /> },
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => handleLayerChange(btn.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 active:scale-95 ${
              activeLayer === btn.key
                ? 'bg-lavender/20 border-lavender/40 text-lavender shadow-[0_0_15px_rgba(196,181,253,0.3)]'
                : 'bg-midnight/50 border-charcoal/60 text-offwhite/50 hover:border-charcoal hover:text-offwhite/80'
            }`}
          >
            {btn.icon}{btn.label}
          </button>
        ))}
        {mlGridLoading && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-offwhite/40 border border-charcoal/40">
            <Loader2 size={12} className="animate-spin" /> Loading ML grid…
          </span>
        )}
      </div>

      {/* ── Map container ── */}
      <div className="relative w-full h-[65vh] rounded-3xl shadow-xl border border-charcoal overflow-hidden group">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || defaultCenter}
          zoom={5}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* ── [LAYER 1] ML Dataset city circles (large radius = city-scale) ── */}
          {showDataset && crimeZones.map(city => {
            const style = ZONE_STYLE[city.zone] || ZONE_STYLE.ORANGE;
            return (
              <Circle
                key={`city_${city.city}`}
                center={{ lat: city.latitude, lng: city.longitude }}
                radius={25000}   // 25 km city-level radius
                options={{
                  fillColor:    style.fill,
                  fillOpacity:  style.opacity,
                  strokeColor:  style.fill,
                  strokeOpacity: 0.5,
                  strokeWeight: 1.5,
                  clickable: true,
                  zIndex: 1,
                }}
                onMouseOver={() => {
                  setSelectedPin({
                    type: 'dataset',
                    name: city.city,
                    zone: city.zone,
                    risk_score: city.risk_score,
                    total_crimes: city.total_crimes,
                    crime_index: city.crime_index,
                    alert_message: city.alert_message,
                    lat: city.latitude,
                    lng: city.longitude,
                  });
                }}
                onMouseOut={() => setSelectedPin(null)}
                onClick={() => setSelectedPin({
                  type: 'dataset',
                  name: city.city,
                  zone: city.zone,
                  risk_score: city.risk_score,
                  total_crimes: city.total_crimes,
                  crime_index: city.crime_index,
                  alert_message: city.alert_message,
                  lat: city.latitude,
                  lng: city.longitude,
                })}
              />
            );
          })}

          {/* ── [LAYER 2] ML Grid prediction circles (medium radius) ── */}
          {showMlGrid && mlGrid.map((pt, i) => {
            const style = ZONE_STYLE[pt.zone] || ZONE_STYLE.ORANGE;
            return (
              <Circle
                key={`ml_${i}`}
                center={{ lat: pt.latitude, lng: pt.longitude }}
                radius={6000}   // ~6 km per grid cell
                options={{
                  fillColor:    style.fill,
                  fillOpacity:  0.10,
                  strokeColor:  style.fill,
                  strokeOpacity: 0.25,
                  strokeWeight: 0.8,
                  zIndex: 2,
                }}
              />
            );
          })}

          {/* ── [LAYER 3] Community review circles (precise 500 m) ── */}
          {showCommunity && clusterReviews(reviews).map(cluster => {
            const zone  = getAverageZone(cluster.avgScore);
            const style = ZONE_STYLE[zone];
            const isSingle = cluster.reviews.length === 1;
            const primaryReview = cluster.reviews[0];

            return (
              <Circle
                key={cluster.id}
                center={{ lat: cluster.lat, lng: cluster.lng }}
                radius={ALERT_RADIUS}
                options={{
                  fillColor:    style.fill,
                  fillOpacity:  0.25,
                  strokeColor:  style.fill,
                  strokeOpacity: 0.7,
                  strokeWeight: 2,
                  clickable: true,
                  zIndex: 3,
                }}
                onMouseOver={() => {
                  setSelectedPin({
                    type: 'community',
                    name: isSingle ? primaryReview.area_name : `${cluster.reviews.length} Clustered Reviews`,
                    zone,
                    safety_rating: isSingle ? primaryReview.safety_rating : `Mixed (${cluster.avgScore.toFixed(1)}/5)`,
                    review_text: isSingle ? primaryReview.review_text : `Average Risk Score: ${cluster.avgScore.toFixed(1)}/5. Most recent: "${cluster.reviews[cluster.reviews.length - 1].review_text}"`,
                    user_name: isSingle ? primaryReview.user_name : 'Multiple Users',
                    lat: cluster.lat,
                    lng: cluster.lng,
                  });
                }}
                onMouseOut={() => setSelectedPin(null)}
                onClick={() => setSelectedPin({
                  type: 'community',
                  name: isSingle ? primaryReview.area_name : `${cluster.reviews.length} Clustered Reviews`,
                  zone,
                  safety_rating: isSingle ? primaryReview.safety_rating : `Mixed (${cluster.avgScore.toFixed(1)}/5)`,
                  review_text: isSingle ? primaryReview.review_text : `Average Risk Score: ${cluster.avgScore.toFixed(1)}/5. Most recent: "${cluster.reviews[cluster.reviews.length - 1].review_text}"`,
                  user_name: isSingle ? primaryReview.user_name : 'Multiple Users',
                  lat: cluster.lat,
                  lng: cluster.lng,
                })}
              />
            );
          })}

          {/* ── User location marker ── */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 9, fillColor: '#C4B5FD', fillOpacity: 1,
                strokeColor: '#ffffff', strokeWeight: 2.5,
              }}
              title="Your Location"
              zIndex={999}
            />
          )}

          {/* ── ML single-point zone ring around user ── */}
          {userLocation && prediction?.zone && (
            <Circle
              center={userLocation}
              radius={1500}
              options={{
                fillColor:    ZONE_STYLE[prediction.zone]?.fill || '#f97316',
                fillOpacity:  0.07,
                strokeColor:  ZONE_STYLE[prediction.zone]?.fill || '#f97316',
                strokeOpacity: 0.3,
                strokeWeight: 1.5,
                zIndex: 4,
              }}
            />
          )}
        </GoogleMap>

        {/* ── My Location button ── */}
        <button
          onClick={centerOnUser}
          className="absolute top-4 right-4 bg-navy/90 border border-charcoal text-offwhite p-3 rounded-xl shadow-lg hover:bg-navy backdrop-blur-sm transition-colors cursor-pointer z-10 hover:scale-105 active:scale-95"
          title="Centre on my location"
        >
          <Navigation size={20} className="text-lavender" />
        </button>

        {/* ── Geofence danger alert banner ── */}
        {activeAlert && !dismissed && (
          <div className="absolute top-4 left-4 right-16 z-20 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-red-950/95 backdrop-blur-md border border-red-500/50 rounded-2xl p-4 shadow-2xl flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 bg-red-500/20 rounded-xl flex items-center justify-center mt-0.5">
                <ShieldAlert size={18} className="text-red-400 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-red-300 text-sm">⚠️ Danger Zone Detected</p>
                <p className="text-red-200/80 text-xs mt-0.5 leading-relaxed">
                  <span className="font-semibold">{activeAlert.name}</span>{' '}
                  {activeAlert.source === 'dataset'
                    ? `— ML Dataset: Red zone city (${activeAlert.crimes} total crimes)`
                    : '— Reported as high risk by community'
                  }{' '}· {activeAlert.distance}m away
                </p>
              </div>
              <button onClick={() => setDismissed(true)} className="shrink-0 text-red-400/60 hover:text-red-300">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Selected zone info popup ── */}
        {selectedPin && (
          <div className="absolute bottom-20 left-4 right-4 z-20 animate-in slide-in-from-bottom-2 duration-300">
            <div
              className="backdrop-blur-md border rounded-2xl p-4 shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: `${ZONE_STYLE[selectedPin.zone]?.fill}15`,
                borderColor:     `${ZONE_STYLE[selectedPin.zone]?.fill}40`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {selectedPin.type === 'dataset'
                    ? <Database size={14} style={{ color: ZONE_STYLE[selectedPin.zone]?.fill }} />
                    : <MapPin size={14} style={{ color: ZONE_STYLE[selectedPin.zone]?.fill }} />
                  }
                  <p className="font-bold text-offwhite text-sm">{selectedPin.name}</p>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      color:           ZONE_STYLE[selectedPin.zone]?.fill,
                      backgroundColor: `${ZONE_STYLE[selectedPin.zone]?.fill}20`,
                    }}
                  >
                    {ZONE_STYLE[selectedPin.zone]?.label}
                  </span>
                </div>
                <button onClick={() => setSelectedPin(null)} className="shrink-0 text-offwhite/40 hover:text-offwhite/80">
                  <X size={15} />
                </button>
              </div>

              {selectedPin.type === 'dataset' ? (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <p className="text-offwhite/40 text-xs">Risk Score</p>
                    <p className="text-offwhite font-bold text-sm">{(selectedPin.risk_score * 100).toFixed(0)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-offwhite/40 text-xs">Total Crimes</p>
                    <p className="text-offwhite font-bold text-sm">{selectedPin.total_crimes}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-offwhite/40 text-xs">Crime Index</p>
                    <p className="text-offwhite font-bold text-sm">{parseFloat(selectedPin.crime_index).toFixed(1)}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-offwhite/60 text-xs leading-relaxed">{selectedPin.review_text}</p>
                  <p className="text-offwhite/35 text-xs mt-1">By {selectedPin.user_name}</p>
                </>
              )}

              <p className="text-xs mt-2 font-medium" style={{ color: ZONE_STYLE[selectedPin.zone]?.fill }}>
                Source: {selectedPin.type === 'dataset' ? '🗃️ ML Crime Dataset' : '👥 Community Review'}
              </p>
            </div>
          </div>
        )}

        {/* ── Legend ── */}
        <div className="absolute bottom-5 left-5 bg-navy/85 backdrop-blur-md border border-charcoal p-4 rounded-2xl shadow-xl z-10 transition-all duration-300">
          <h4 className="text-xs font-bold text-offwhite mb-2.5 uppercase tracking-widest">Risk Legend</h4>
          <div className="space-y-2">
            {[
              { color: 'bg-red-500',    glow: 'rgba(239,68,68,0.8)',  label: 'High Danger' },
              { color: 'bg-orange-500', glow: 'rgba(249,115,22,0.8)', label: 'Moderate Risk' },
              { color: 'bg-green-500',  glow: 'rgba(34,197,94,0.8)',  label: 'Safe Zone' },
              { color: 'bg-lavender',   glow: 'rgba(196,181,253,0.8)',label: 'Your Location' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${l.color}`} style={{ boxShadow: `0 0 8px ${l.glow}` }} />
                <span className="text-xs text-offwhite/80">{l.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2.5 border-t border-charcoal/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1.5 rounded-full bg-red-500/40 border border-red-500/60" />
              <span className="text-xs text-offwhite/50">Large = City (dataset)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1.5 rounded-full bg-red-500/25 border border-red-500/40" />
              <span className="text-xs text-offwhite/50">Medium = ML grid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-1.5 rounded-full bg-red-500/60 border border-red-500/80" />
              <span className="text-xs text-offwhite/50">Small = Community (500m)</span>
            </div>
          </div>
        </div>

        {/* ── Data source pill ── */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-navy/85 backdrop-blur-sm border border-charcoal px-3 py-1.5 rounded-full shadow-lg z-10 transition-all duration-300">
          <span className="text-xs text-offwhite/70 font-medium">
            {crimeZones.length} cities · {reviews.length} reviews · {mlGrid.length} ML points
          </span>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
