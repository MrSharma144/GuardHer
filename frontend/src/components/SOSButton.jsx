import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, MapPin, Loader2, XCircle, Timer } from "lucide-react";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [countdown, setCountdown] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const startCountdown = () => {
    setAlert({ message: "⚠️ SOS will be sent in 3 seconds. Tap again to cancel.", type: "warning" });
    setCountdown(3);
    setCancelled(false);
  };

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

  const cancelSOS = () => {
    setCancelled(true);
    setCountdown(null);
    setAlert({ message: "❌ SOS cancelled.", type: "info" });
  };

  const handleSOS = () => {
    if (!navigator.geolocation) {
      setAlert({ message: "❌ Geolocation not supported by your browser.", type: "error" });
      return;
    }

    setLoading(true);
    setAlert({ message: "📍 Fetching your location...", type: "info" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post("http://localhost:3000/api/sos", {
            latitude,
            longitude,
          });

          if (response.data.success) {
            setAlert({
              message: "🚨 SOS Sent Successfully! Authorities have been alerted.",
              type: "success",
            });
          } else {
            setAlert({ message: "⚠️ Failed to send SOS. Try again.", type: "warning" });
          }
        } catch (error) {
          console.error("Error sending SOS:", error);
          setAlert({ message: "❌ Network error. Please check your connection.", type: "error" });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setAlert({ message: "❌ Unable to retrieve your location.", type: "error" });
        setLoading(false);
      }
    );
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-600/10 border-green-600 text-green-400";
      case "error":
        return "bg-red-600/10 border-red-600 text-red-400";
      case "warning":
        return "bg-yellow-600/10 border-yellow-600 text-yellow-400";
      case "info":
        return "bg-blue-600/10 border-blue-600 text-blue-400";
      default:
        return "bg-transparent border-transparent text-gray-300";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6" />;
      case "error":
        return <XCircle className="w-6 h-6" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6" />;
      case "info":
        return <MapPin className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className=" fixed top-0 left-0 w-full flex flex-col items-center justify-center mt-15 p-6 bg-[#0A2540] text-white px-4">
      <motion.button
        onClick={() => {
          if (countdown) cancelSOS();
          else startCountdown();
        }}
        disabled={loading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#FF6B6B] text-white text-3xl font-bold px-16 py-8 rounded-full shadow-2xl hover:bg-[#ff4d4d] transition-all disabled:opacity-70 flex items-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 className="w-7 h-7 animate-spin" /> Sending...
          </>
        ) : countdown ? (
          <>
            <Timer className="w-7 h-7 animate-pulse" /> {countdown}s
          </>
        ) : (
          <>🚨 SOS</>
        )}
      </motion.button>

      {alert.message && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 border rounded-xl px-5 py-4 flex items-center gap-3 text-lg shadow-md ${getAlertStyle(
            alert.type
          )}`}
        >
          {getAlertIcon(alert.type)}
          <p>{alert.message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SOSButton;
