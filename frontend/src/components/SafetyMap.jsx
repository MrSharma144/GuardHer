import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Loader2, Navigation, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

const libraries = ['visualization'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090, // New Delhi default
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  ],
};

const SafetyMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", 
    libraries,
  });

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [heatmapLayer, setHeatmapLayer] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        () => console.warn("Geolocation denied")
      );
    }
  }, []);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const data = await api.get('/locations/heatmap-data/');
        setHeatmapData(data);
      } catch (err) {
        console.error("Failed to fetch heatmap data:", err);
      }
    };
    fetchHeatmap();
  }, []);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && heatmapData.length > 0 && window.google) {
      if (heatmapLayer) heatmapLayer.setMap(null);

      const mapDataPoints = heatmapData.map(pt => ({
        location: new window.google.maps.LatLng(pt.lat, pt.lng),
        weight: pt.intensity
      }));

      const newHeatmap = new window.google.maps.visualization.HeatmapLayer({
        data: mapDataPoints,
        radius: 40,
        gradient: [
          'rgba(0, 0, 0, 0)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)'
        ]
      });

      newHeatmap.setMap(map);
      setHeatmapLayer(newHeatmap);
    }
    return () => { if (heatmapLayer) heatmapLayer.setMap(null); };
  }, [isLoaded, map, heatmapData]);

  const centerOnUser = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(14);
    }
  };

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
    <div className="relative w-full h-[60vh] rounded-3xl shadow-xl border border-charcoal overflow-hidden group">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || defaultCenter}
        zoom={12}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {userLocation && (
          <Marker position={userLocation} icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#C4B5FD',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }} />
        )}
      </GoogleMap>

      <button onClick={centerOnUser} className="absolute top-4 right-4 bg-navy/90 border border-charcoal text-offwhite p-3 rounded-xl shadow-lg hover:bg-navy backdrop-blur-sm transition-colors group-hover:opacity-100 cursor-pointer" title="My Location">
        <Navigation size={20} className="text-lavender" />
      </button>

      <div className="absolute bottom-6 left-6 bg-navy/80 backdrop-blur-md border border-charcoal p-4 rounded-2xl shadow-xl">
        <h4 className="text-sm font-bold text-offwhite mb-3">Heatmap Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div><span className="text-xs text-offwhite/80 font-medium">High Danger Area</span></div>
          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div><span className="text-xs text-offwhite/80 font-medium">Moderate Risk</span></div>
          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div><span className="text-xs text-offwhite/80 font-medium">Safe Zone</span></div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
