import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Users, Phone, BellRing, Map, X, AlertOctagon } from 'lucide-react';
import SOSButton from '../components/SOSButton';
import SafetyMap from '../components/SafetyMap';
import CrimeAnalytics from '../components/CrimeAnalytics';
import Contacts from './Contacts';
import EmergencyHistory from './EmergencyHistory';
import { api } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentAlerts,     setRecentAlerts]     = useState([]);
  const [safetyPrediction, setSafetyPrediction] = useState(null);
  const [dangerAlert,      setDangerAlert]      = useState(null);   // fired from SafetyMap

  const handleDangerZoneAlert = useCallback((alert) => {
    setDangerAlert(alert);
    // Auto-dismiss after 30 s
    setTimeout(() => setDangerAlert(null), 30_000);
  }, []);

  useEffect(() => {
    const fetchRecentAlerts = async () => {
      try {
        const data = await api.get('/emergency/');
        setRecentAlerts(data.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch recent alerts', err);
      }
    };
    fetchRecentAlerts();

    // Fetch ML prediction
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await api.get(`/emergency/predict-zone/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`);
            setSafetyPrediction(data);
            
            // If it's a risk zone, send an email (once per session)
            if (data.zone === 'RED' || data.zone === 'ORANGE') {
              const hasSent = sessionStorage.getItem('hasSentRiskZoneAlert');
              if (!hasSent) {
                try {
                  await api.post('/emergency/notify-risk-zone/', {
                    zone: data.zone,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    alert_message: data.alert_message
                  });
                  sessionStorage.setItem('hasSentRiskZoneAlert', 'true');
                } catch (e) {
                  console.error('Failed to send risk zone email', e);
                }
              }
            }
          } catch (err) {
            console.error('Failed to get safety prediction', err);
          }
        },
        (error) => console.error(error)
      );
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500 scroll-smooth">

      {/* ══ GEOFENCE DANGER BANNER ══════════════════════════════ */}
      {dangerAlert && (
        <div className="mb-6 animate-in slide-in-from-top-3 duration-400">
          <div className="relative rounded-2xl overflow-hidden border border-red-500/40 bg-red-950/60 backdrop-blur-sm p-5 flex items-start gap-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            {/* Pulsing glow strip at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <AlertOctagon size={24} className="text-red-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <h3 className="font-black text-red-300 text-base">⚠️ You are entering a Danger Zone!</h3>
              </div>
              <p className="text-red-200/80 text-sm leading-relaxed">
                <span className="font-semibold text-red-200">{dangerAlert.area_name}</span> has been reported as a{' '}
                <span className="font-semibold text-red-300">
                  {dangerAlert.safety_rating === 'very_high_risk' ? 'Very High Risk' : 'High Risk'}
                </span>{' '}
                area — {dangerAlert.distance}m from your current location.
                Consider using the SOS button or contacting someone you trust.
              </p>
            </div>
            <button
              onClick={() => setDangerAlert(null)}
              className="shrink-0 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      {/* SECTION 1: HERO & SOS */}
      <section id="overview" className="space-y-8 mb-16 pt-4">
        <header>
          <h1 className="text-3xl font-bold text-lavender tracking-tight">
            Dashboard Overview 👋
          </h1>
          <p className="text-offwhite/60 mt-1">Your personal safety dashboard is active and monitoring.</p>
        </header>

        {safetyPrediction && (
          safetyPrediction.zone === 'GREEN' ? (
            <div className="p-4 rounded-xl border flex items-center gap-4 shadow-lg bg-green-500/10 border-green-500/30 text-green-400">
              <ShieldAlert size={28} className="shrink-0" />
              <div>
                <h3 className="font-bold text-lg">AI Safety Prediction: GREEN ZONE</h3>
                <p className="text-sm opacity-90">{safetyPrediction.alert_message} (Risk Score: {safetyPrediction.crime_score})</p>
              </div>
            </div>
          ) : (
            <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start gap-5 shadow-2xl relative overflow-hidden ${
              safetyPrediction.zone === 'ORANGE' ? 'bg-orange-950/40 border-orange-500/40 text-orange-400' : 'bg-red-950/40 border-red-500/40 text-red-400'
            }`}>
              <div className={`absolute top-0 left-0 right-0 h-1 animate-pulse ${safetyPrediction.zone === 'ORANGE' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
              <div className={`p-3 rounded-xl shrink-0 ${safetyPrediction.zone === 'ORANGE' ? 'bg-orange-500/20' : 'bg-red-500/20'}`}>
                <AlertOctagon size={32} className="animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-xl mb-1 flex items-center gap-2">
                  ⚠️ AI Safety Alert: {safetyPrediction.zone} RISK ZONE
                </h3>
                <p className="text-sm opacity-90 mb-3">{safetyPrediction.alert_message} (Risk Score: {safetyPrediction.crime_score})</p>
                
                <div className={`mt-3 p-4 rounded-xl border ${safetyPrediction.zone === 'ORANGE' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <p className="font-bold text-sm mb-2 text-offwhite">Safety Suggestions:</p>
                  <ul className="text-sm space-y-1.5 text-offwhite/80 list-disc list-inside">
                    <li>Share your live location with trusted contacts.</li>
                    <li>Stick to well-lit main streets and avoid alleys.</li>
                    <li>Stay aware of your surroundings and avoid distractions.</li>
                    <li className="text-lavender">An automated safety alert has been sent to your email.</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        )}

        <div className="bg-gradient-to-br from-navy to-midnight border border-charcoal/50 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="text-center space-y-4 relative z-10">
            <div className="inline-flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-full text-sm font-semibold mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              Emergency System Armed
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-offwhite tracking-tight">Immediate Assistance</h2>
            <p className="text-offwhite/70 max-w-lg mx-auto text-lg leading-relaxed">
              Press the SOS button in case of an emergency. This will instantly send your exact location and alert your emergency contacts.
            </p>
          </div>
          <div className="relative z-10 w-full flex justify-center py-6">
            <SOSButton />
          </div>
        </div>
      </section>

      {/* SECTION 2: MAP */}
      <section id="map" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Map className="text-lavender" size={28} />
          <h2 className="text-2xl font-bold text-offwhite">Safety Risk Map</h2>
        </div>
        <p className="text-offwhite/60 mb-5 px-2 max-w-3xl text-sm leading-relaxed">
          Three data layers combined: <span className="text-lavender font-medium">ML Crime Dataset</span> (30 Indian cities),{' '}
          <span className="text-lavender font-medium">ML Grid Predictions</span> (AI-scored zones around your location), and{' '}
          <span className="text-lavender font-medium">Community Reviews</span> (live reports from users).
          Red = Danger · Orange = Moderate · Green = Safe.
        </p>
        <SafetyMap onDangerZoneAlert={handleDangerZoneAlert} />
      </section>

      {/* SECTION 3: CONTACTS */}
      <section id="contacts" className="mb-16 scroll-mt-24">
        <div className="bg-midnight/30 p-1 md:p-8 rounded-[2.5rem] border border-transparent md:border-charcoal/30">
          <Contacts isEmbedded={true} />
        </div>
      </section>

      {/* SECTION 4: HISTORY */}
      <section id="history" className="mb-16 scroll-mt-24">
        <div className="bg-midnight/30 p-1 md:p-8 rounded-[2.5rem] border border-transparent md:border-charcoal/30">
          <EmergencyHistory isEmbedded={true} />
        </div>
      </section>

      {/* SECTION 5: AI ANALYTICS */}
      <section id="analytics" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6 px-2">
          <ShieldAlert className="text-lavender" size={28} />
          <h2 className="text-2xl font-bold text-offwhite">Area Safety Analytics</h2>
        </div>
        <p className="text-offwhite/60 mb-6 px-2 max-w-2xl">
          Powered by Machine Learning models trained on historical crime datasets to deliver accurate risk analysis.
        </p>
        <CrimeAnalytics />
      </section>

    </div>
  );
};

export default Dashboard;
