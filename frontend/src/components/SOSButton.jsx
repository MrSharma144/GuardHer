import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, MapPin, Loader2, XCircle, Timer } from "lucide-react";
import { api } from "../services/api";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [countdown, setCountdown] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0 && !cancelled) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && !cancelled) {
      handleSOS();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown, cancelled]);

  const startCountdown = () => {
    setAlert({ message: "⚠️ SOS will be sent in 3 seconds. Tap again to cancel.", type: "warning" });
    setCountdown(3);
    setCancelled(false);
  };

  const cancelSOS = () => {
    setCancelled(true);
    setCountdown(null);
    setAlert({ message: "❌ SOS cancelled.", type: "info" });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  const handleSOS = () => {
    if (!navigator.geolocation) {
      sendAlert(null, null);
      return;
    }

    setLoading(true);
    setAlert({ message: "📍 Fetching your location...", type: "info" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendAlert(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(error);
        sendAlert(null, null); // Send without location if it fails
      }
    );
  };

  const sendAlert = async (lat, lng) => {
    try {
      const response = await api.post("/emergency/", {
        location_latitude: lat,
        location_longitude: lng,
      });
      setAlert({
        message: "🚨 SOS Sent Successfully! Authorities and contacts have been alerted.",
        type: "success",
      });
    } catch (error) {
      console.error("Error sending SOS:", error);
      setAlert({ message: "❌ Failed to send SOS. Please check your connection.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert({ message: "", type: "" }), 5000);
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case "success": return "bg-green-500/10 border-green-500/30 text-green-400";
      case "error": return "bg-red-500/10 border-red-500/30 text-red-400";
      case "warning": return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "info": return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      default: return "bg-transparent border-transparent text-gray-300 hidden";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 shrink-0" />;
      case "error": return <XCircle className="w-5 h-5 shrink-0" />;
      case "warning": return <AlertTriangle className="w-5 h-5 shrink-0" />;
      case "info": return <MapPin className="w-5 h-5 shrink-0" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.button
        onClick={() => {
          if (countdown) cancelSOS();
          else startCountdown();
        }}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group bg-coral text-navy text-2xl md:text-3xl font-black px-12 py-10 rounded-full shadow-[0_0_30px_rgba(255,107,107,0.4)] hover:shadow-[0_0_45px_rgba(255,107,107,0.6)] transition-all disabled:opacity-70 flex flex-col items-center gap-2 mb-6"
      >
        {/* Pulsing rings for visual urgency */}
        {!loading && !countdown && (
          <div className="absolute inset-0 rounded-full border-[3px] border-coral animate-ping opacity-20"></div>
        )}
        
        {loading ? (
          <>
            <Loader2 className="w-10 h-10 animate-spin" /> 
            <span className="text-xl">Sending...</span>
          </>
        ) : countdown ? (
          <>
            <Timer className="w-10 h-10 animate-pulse text-white" />
            <span className="text-white">{countdown}s Cancel</span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-12 h-12" />
            <span>SOS</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {alert.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-sm border rounded-xl px-4 py-3 flex items-start gap-3 text-sm md:text-base backdrop-blur-sm ${getAlertStyle(
              alert.type
            )}`}
          >
            {getAlertIcon(alert.type)}
            <p className="leading-tight pt-0.5">{alert.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSButton;
