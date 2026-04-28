import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import {
  MapPin, Star, Send, Wifi, WifiOff, Filter,
  AlertTriangle, Shield, CheckCircle, XCircle,
  Clock, User, RefreshCw, ChevronDown, Navigation,
  TrendingUp, Eye, MessageSquare
} from "lucide-react";

// ─── Safety Rating Config ──────────────────────────────────────────────────────
const RATINGS = [
  {
    value: "very_safe",
    label: "Very Safe",
    emoji: "🟢",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  {
    value: "safe",
    label: "Safe",
    emoji: "🟩",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    dot: "bg-green-400",
  },
  {
    value: "moderate",
    label: "Moderate Risk",
    emoji: "🟡",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  {
    value: "high_risk",
    label: "High Risk",
    emoji: "🟠",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    dot: "bg-orange-400",
  },
  {
    value: "very_high_risk",
    label: "Very High Risk",
    emoji: "🔴",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    dot: "bg-red-400",
  },
];

const getRating = (value) => RATINGS.find((r) => r.value === value) || RATINGS[2];

// ─── Time Ago ─────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── WS Status Badge ──────────────────────────────────────────────────────────
function WsBadge({ connected }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
        connected
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          : "bg-red-500/10 text-red-400 border-red-500/30"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
      {connected ? "Live" : "Offline"}
    </span>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────
function ReviewCard({ review, isNew }) {
  const r = getRating(review.safety_rating);
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-500 ${r.bg} ${r.border} ${
        isNew ? "animate-[fadeSlideIn_0.4s_ease-out]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lavender to-coral flex items-center justify-center text-navy font-black text-sm shrink-0">
            {(review.user_name || "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-offwhite text-sm">{review.user_name}</p>
            <div className="flex items-center gap-1 text-offwhite/40 text-xs">
              <Clock size={11} />
              {timeAgo(review.created_at)}
            </div>
          </div>
        </div>
        {/* Rating Badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${r.badge}`}>
          {r.emoji} {r.label}
        </span>
      </div>

      {/* Area Name */}
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={14} className={r.color} />
        <span className={`font-bold text-sm ${r.color}`}>{review.area_name}</span>
        {review.latitude && review.longitude && (
          <span className="text-offwhite/30 text-xs ml-auto flex items-center gap-1">
            <Navigation size={10} />
            {review.latitude.toFixed(4)}, {review.longitude.toFixed(4)}
          </span>
        )}
      </div>

      {/* Review Text */}
      <p className="text-offwhite/70 text-sm leading-relaxed">{review.review_text}</p>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ reviews }) {
  const counts = RATINGS.map((r) => ({
    ...r,
    count: reviews.filter((rv) => rv.safety_rating === r.value).length,
  }));
  const total = reviews.length || 1;

  return (
    <div className="bg-midnight border border-charcoal rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-lavender" />
        <h3 className="text-sm font-bold text-offwhite">Safety Distribution</h3>
        <span className="ml-auto text-xs text-offwhite/40">{reviews.length} total</span>
      </div>
      <div className="space-y-2.5">
        {counts.map((r) => (
          <div key={r.value} className="flex items-center gap-3 text-xs">
            <span className="w-24 text-offwhite/60 shrink-0">{r.emoji} {r.label}</span>
            <div className="flex-1 h-2 bg-charcoal rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${r.dot} transition-all duration-700`}
                style={{ width: `${(r.count / total) * 100}%` }}
              />
            </div>
            <span className="w-6 text-right text-offwhite/50">{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AreaReviews() {
  const { user } = useAuth();

  // ── State ────────────────────────────────────────────────────────────────
  const [reviews, setReviews]       = useState([]);
  const [newIds,  setNewIds]        = useState(new Set());
  const [filter,  setFilter]        = useState("all");
  const [wsConnected, setWsConnected] = useState(false);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]           = useState(null);

  // Form state
  const [form, setForm] = useState({
    area_name:     "",
    safety_rating: "",
    review_text:   "",
    latitude:      "",
    longitude:     "",
  });
  const [gpsLoading, setGpsLoading] = useState(false);

  const wsRef      = useRef(null);
  const feedRef    = useRef(null);
  const reconnectRef = useRef(null);

  // ── Toast ────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Fetch initial reviews ────────────────────────────────────────────────
  const fetchReviews = useCallback(async () => {
    try {
      const data = await api.get("/reviews/");
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load reviews.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── WebSocket ────────────────────────────────────────────────────────────
  const connectWs = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const token = localStorage.getItem("access_token") || "";
    const ws = new WebSocket(`ws://localhost:8000/ws/reviews/?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };

    ws.onclose = () => {
      setWsConnected(false);
      // Auto-reconnect after 3 seconds
      reconnectRef.current = setTimeout(connectWs, 3000);
    };

    ws.onerror = () => ws.close();

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "review.new") {
          const newReview = msg.review;
          setReviews((prev) => {
            // Don't duplicate if already exists
            if (prev.some((r) => r.id === newReview.id)) return prev;
            return [newReview, ...prev];
          });
          setNewIds((prev) => new Set(prev).add(newReview.id));
          // Remove the "new" highlight after 3s
          setTimeout(() => {
            setNewIds((prev) => {
              const next = new Set(prev);
              next.delete(newReview.id);
              return next;
            });
          }, 3000);
          // Scroll feed to top
          feedRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch {}
    };
  }, []);

  useEffect(() => {
    fetchReviews();
    connectWs();
    return () => {
      wsRef.current?.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [fetchReviews, connectWs]);

  // ── GPS ──────────────────────────────────────────────────────────────────
  const getGps = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation not supported.", "error");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((p) => ({
          ...p,
          latitude:  pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setGpsLoading(false);
        showToast("GPS location captured!", "success");
      },
      () => {
        setGpsLoading(false);
        showToast("Could not get location.", "error");
      }
    );
  };

  // ── Submit Review ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.area_name.trim())   return showToast("Enter an area name.", "error");
    if (!form.safety_rating)      return showToast("Select a safety rating.", "error");
    if (!form.review_text.trim()) return showToast("Write a short review.", "error");

    setSubmitting(true);
    try {
      const payload = {
        area_name:     form.area_name.trim(),
        safety_rating: form.safety_rating,
        review_text:   form.review_text.trim(),
        ...(form.latitude  && { latitude:  parseFloat(form.latitude) }),
        ...(form.longitude && { longitude: parseFloat(form.longitude) }),
      };
      await api.post("/reviews/", payload);
      setForm({ area_name: "", safety_rating: "", review_text: "", latitude: "", longitude: "" });
      showToast("Review submitted! Others will see it live.", "success");
    } catch {
      showToast("Failed to submit review. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Filtered reviews ──────────────────────────────────────────────────────
  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.safety_rating === filter);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto pb-10 space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/20 border-red-500/40 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle size={18} /> : <XCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* ── Header ── */}
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-lavender tracking-tight">
            Area <span className="text-coral">Safety Reviews</span>
          </h1>
          <p className="text-offwhite/50 text-sm mt-1">
            Rate areas you've visited and help others stay safe in real-time.
          </p>
        </div>
        <WsBadge connected={wsConnected} />
      </header>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── LEFT: Feed ── */}
        <div className="space-y-4">

          {/* Filter Tabs */}
          <div className="bg-midnight border border-charcoal rounded-2xl p-3 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === "all"
                  ? "bg-lavender text-navy"
                  : "text-offwhite/50 hover:text-offwhite hover:bg-navy/50"
              }`}
            >
              All ({reviews.length})
            </button>
            {RATINGS.map((r) => {
              const count = reviews.filter((rv) => rv.safety_rating === r.value).length;
              return (
                <button
                  key={r.value}
                  onClick={() => setFilter(r.value)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    filter === r.value
                      ? `${r.bg} ${r.border} ${r.color}`
                      : "border-transparent text-offwhite/50 hover:text-offwhite hover:bg-navy/50"
                  }`}
                >
                  {r.emoji} {r.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Review Feed */}
          <div
            ref={feedRef}
            className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar pr-1"
          >
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <RefreshCw size={28} className="text-lavender animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-offwhite/30">
                <MessageSquare size={48} className="mb-4 opacity-30" />
                <p className="font-semibold">No reviews yet</p>
                <p className="text-sm mt-1">
                  {filter === "all" ? "Be the first to review an area!" : "No reviews for this rating."}
                </p>
              </div>
            ) : (
              filtered.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isNew={newIds.has(review.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT: Submit Form + Stats ── */}
        <div className="space-y-4 lg:sticky lg:top-4">

          {/* Submit Form */}
          <div className="bg-midnight border border-charcoal rounded-3xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-charcoal bg-navy/30">
              <div className="p-2 rounded-xl bg-charcoal/50 text-coral">
                <Send size={18} />
              </div>
              <h2 className="font-bold text-offwhite">Submit a Review</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Area Name */}
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-2">
                  Area / Location Name *
                </span>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite/30" />
                  <input
                    type="text"
                    value={form.area_name}
                    onChange={(e) => setForm((p) => ({ ...p, area_name: e.target.value }))}
                    placeholder="e.g. MG Road, Connaught Place"
                    maxLength={200}
                    className="w-full bg-navy/50 border border-charcoal rounded-xl pl-9 pr-4 py-3 text-offwhite placeholder-offwhite/25 text-sm focus:outline-none focus:border-lavender/60 focus:ring-1 focus:ring-lavender/30 transition-all"
                  />
                </div>
              </label>

              {/* Safety Rating — Visual Selector */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-3">
                  Safety Rating *
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {RATINGS.map((r) => (
                    <label
                      key={r.value}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        form.safety_rating === r.value
                          ? `${r.bg} ${r.border} ${r.color}`
                          : "border-charcoal text-offwhite/60 hover:border-charcoal/80 hover:bg-navy/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="safety_rating"
                        value={r.value}
                        checked={form.safety_rating === r.value}
                        onChange={(e) => setForm((p) => ({ ...p, safety_rating: e.target.value }))}
                        className="sr-only"
                      />
                      <span className="text-lg leading-none">{r.emoji}</span>
                      <span className="font-semibold text-sm flex-1">{r.label}</span>
                      {form.safety_rating === r.value && (
                        <CheckCircle size={15} className={r.color} />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-2">
                  Your Experience *
                </span>
                <textarea
                  value={form.review_text}
                  onChange={(e) => setForm((p) => ({ ...p, review_text: e.target.value }))}
                  placeholder="Describe what you observed — lighting, crowd level, incidents…"
                  rows={3}
                  maxLength={1000}
                  className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3 text-offwhite placeholder-offwhite/25 text-sm focus:outline-none focus:border-lavender/60 focus:ring-1 focus:ring-lavender/30 transition-all resize-none"
                />
                <p className="text-xs text-offwhite/30 text-right mt-1">
                  {form.review_text.length}/1000
                </p>
              </label>

              {/* GPS Capture */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-2">
                  GPS Coordinates (Optional)
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.latitude}
                    onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
                    placeholder="Latitude"
                    className="flex-1 bg-navy/50 border border-charcoal rounded-xl px-3 py-2.5 text-offwhite/70 placeholder-offwhite/20 text-xs focus:outline-none focus:border-lavender/40 transition-all"
                  />
                  <input
                    type="text"
                    value={form.longitude}
                    onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
                    placeholder="Longitude"
                    className="flex-1 bg-navy/50 border border-charcoal rounded-xl px-3 py-2.5 text-offwhite/70 placeholder-offwhite/20 text-xs focus:outline-none focus:border-lavender/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={getGps}
                    disabled={gpsLoading}
                    title="Auto-capture GPS"
                    className="px-3 py-2.5 rounded-xl bg-lavender/10 border border-lavender/30 text-lavender hover:bg-lavender/20 transition-all disabled:opacity-50"
                  >
                    {gpsLoading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Navigation size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !user}
                className="w-full flex items-center justify-center gap-2 bg-coral text-navy font-black py-3 rounded-xl hover:bg-coral/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-coral/20"
              >
                {submitting ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {submitting ? "Submitting…" : user ? "Submit Review" : "Login to Review"}
              </button>

              {!user && (
                <p className="text-xs text-offwhite/40 text-center">
                  You must be logged in to post a review.
                </p>
              )}
            </form>
          </div>

          {/* Stats */}
          <StatsBar reviews={reviews} />

          {/* Live Info Card */}
          <div className="bg-midnight border border-charcoal rounded-2xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-lavender/10 text-lavender shrink-0">
              <Eye size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-offwhite mb-0.5">Real-time Updates</p>
              <p className="text-xs text-offwhite/50 leading-relaxed">
                Reviews from other users appear instantly via WebSocket — no page refresh needed.
                {wsConnected
                  ? " You are connected and receiving live updates."
                  : " Reconnecting…"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframe for new-review animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}
