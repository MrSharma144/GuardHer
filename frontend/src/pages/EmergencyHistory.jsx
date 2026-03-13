import { useState, useEffect } from "react";
import { api } from "../services/api";
import { History, MapPin, Loader2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function EmergencyHistory() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await api.get("/emergency/");
        setAlerts(data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-offwhite tracking-tight flex items-center gap-3">
          <History size={28} className="text-lavender" /> Alert History
        </h2>
        <p className="text-offwhite/60 mt-1">A record of all past SOS activations and their resolution states.</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-lavender w-10 h-10" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-midnight border border-charcoal rounded-3xl p-12 text-center flex flex-col items-center">
          <div className="bg-green-500/10 p-4 rounded-full mb-4 inline-block shadow-inner border border-green-500/20">
            <ShieldCheck className="text-green-400" size={48} />
          </div>
          <h3 className="text-xl font-semibold text-offwhite mb-2">No Alerts Triggered</h3>
          <p className="text-offwhite/60 max-w-sm">You have not triggered any SOS alerts yet. Your safety record is clean.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="relative overflow-hidden bg-midnight border border-charcoal p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Status Banner stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.status === 'active' ? 'bg-red-500' : 'bg-green-500'}`}></div>

              <div className="flex items-start gap-4 pl-2">
                <div className={`mt-1 p-2 rounded-lg ${alert.status === 'active' ? 'bg-red-500/10 text-red-400' : 'bg-navy border border-charcoal text-offwhite/40'}`}>
                  {alert.status === 'active' ? <AlertTriangle size={24} /> : <History size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-offwhite">SOS Activated</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      alert.status === 'active' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-offwhite/60">
                    {new Date(alert.timestamp).toLocaleString(undefined, {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-offwhite/80 bg-navy/50 px-4 py-2.5 rounded-xl border border-charcoal pl-2 md:pl-4 self-start md:self-auto">
                <MapPin className="text-coral" size={16} />
                {alert.location_latitude && alert.location_longitude ? (
                  <span className="font-mono">{alert.location_latitude.toFixed(4)}, {alert.location_longitude.toFixed(4)}</span>
                ) : (
                  <span className="italic text-offwhite/50">Location unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
