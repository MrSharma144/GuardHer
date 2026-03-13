import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Users, Phone, BellRing, Map } from 'lucide-react';
import SOSButton from '../components/SOSButton';
import SafetyMap from '../components/SafetyMap';
import Contacts from './Contacts';
import EmergencyHistory from './EmergencyHistory';
import { api } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentAlerts, setRecentAlerts] = useState([]);

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
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-in fade-in duration-500 scroll-smooth">
      {/* SECTION 1: HERO & SOS */}
      <section id="overview" className="space-y-8 mb-16 pt-4">
        <header>
          <h1 className="text-3xl font-bold text-lavender tracking-tight">
            Dashboard Overview 👋
          </h1>
          <p className="text-offwhite/60 mt-1">Your personal safety dashboard is active and monitoring.</p>
        </header>

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
        <div className="flex items-center gap-3 mb-6 px-2">
          <Map className="text-lavender" size={28} />
          <h2 className="text-2xl font-bold text-offwhite">Safety Heatmap</h2>
        </div>
        <p className="text-offwhite/60 mb-6 px-2 max-w-2xl">
          Live visualization of reported danger zones and safe routes in your area based on community reports.
        </p>
        <SafetyMap />
      </section>

      {/* SECTION 3: CONTACTS */}
      <section id="contacts" className="mb-16 scroll-mt-24">
        <div className="bg-midnight/30 p-1 md:p-8 rounded-[2.5rem] border border-transparent md:border-charcoal/30">
          <Contacts isEmbedded={true} />
        </div>
      </section>

      {/* SECTION 4: HISTORY */}
      <section id="history" className="scroll-mt-24">
        <div className="bg-midnight/30 p-1 md:p-8 rounded-[2.5rem] border border-transparent md:border-charcoal/30">
          <EmergencyHistory isEmbedded={true} />
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
