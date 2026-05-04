import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, Shield, MapPin, Star, ArrowRight,
  MessageSquare, Heart, TrendingUp, Zap, Clock,
  CheckCircle2, ChevronRight
} from "lucide-react";

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Sample review data (static showcase) ─────────────────────────────────────

const sampleReviews = [
  {
    user: "Priya M.",
    initials: "PM",
    area: "Connaught Place, Delhi",
    rating: "very_safe",
    label: "Very Safe",
    emoji: "🟢",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    text: "Well-lit streets, police patrolling regularly. Lots of cafés and shops open late. Felt very comfortable walking alone.",
    time: "2h ago",
  },
  {
    user: "Anika S.",
    initials: "AS",
    area: "Banjara Hills, Hyderabad",
    rating: "safe",
    label: "Safe",
    emoji: "🟩",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    text: "Busy commercial area, generally safe. Recommend avoiding back lanes after 10PM. Stick to the main boulevard.",
    time: "5h ago",
  },
  {
    user: "Riya K.",
    initials: "RK",
    area: "Andheri West, Mumbai",
    rating: "moderate",
    label: "Moderate Risk",
    emoji: "🟡",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    text: "Crowded during rush hour but poorly lit side streets. Had a few uncomfortable encounters near the station. Be alert.",
    time: "1d ago",
  },
  {
    user: "Meera V.",
    initials: "MV",
    area: "Koramangala, Bangalore",
    rating: "very_safe",
    label: "Very Safe",
    emoji: "🟢",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    text: "Tech hub with 24/7 activity. Security personnel outside most buildings. Felt completely safe late at night.",
    time: "3h ago",
  },
];

const stats = [
  { value: "12,400+", label: "Reviews Submitted", icon: MessageSquare, color: "text-coral" },
  { value: "340+", label: "Areas Mapped", icon: MapPin, color: "text-lavender" },
  { value: "8,200+", label: "Active Members", icon: Users, color: "text-emerald-400" },
  { value: "4.8★", label: "Community Rating", icon: Star, color: "text-amber-400" },
];

const howItWorks = [
  {
    icon: MapPin,
    title: "Visit an Area",
    desc: "Go somewhere and take note of safety conditions — lighting, crowd levels, police presence.",
    color: "text-coral",
    bg: "bg-coral/10 border-coral/25",
  },
  {
    icon: Star,
    title: "Rate & Review",
    desc: "Open GuardHer, select the area, choose a safety rating and write a brief description.",
    color: "text-lavender",
    bg: "bg-lavender/10 border-lavender/25",
  },
  {
    icon: Zap,
    title: "Go Live Instantly",
    desc: "Your review is broadcast in real-time via WebSocket so others see it the moment you submit.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/25",
  },
];

const benefits = [
  "Real-time area safety ratings from real women",
  "Crowd-sourced danger zone mapping",
  "Live WebSocket feed — no page refresh needed",
  "Filter by safety level to find safe areas fast",
  "GPS-tagged reviews for precise location data",
  "Anonymous option to protect your identity",
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Community() {
  return (
    <div className="min-h-screen bg-midnight text-offwhite overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-14 md:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-16 right-1/4 w-96 h-96 bg-coral/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-lavender/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/30 bg-coral/10 text-coral text-sm font-semibold mb-6"
          >
            <Users size={14} /> Built by the Community
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-coral via-pink-400 to-lavender bg-clip-text text-transparent">
              Community
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-base sm:text-lg text-offwhite/60 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10"
          >
            Thousands of women sharing real-time area safety reviews, helping each
            other navigate the world with confidence. Every review you submit could
            keep someone safe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-6 sm:px-7 py-3.5 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.35)] hover:shadow-[0_4px_28px_rgba(255,107,107,0.55)] transition-all hover:-translate-y-0.5"
            >
              Join & Submit Reviews <ArrowRight size={17} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 border border-charcoal text-offwhite/75 font-semibold px-6 sm:px-7 py-3.5 rounded-xl hover:border-lavender/40 hover:text-lavender transition-all"
            >
              Already a member? Log In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 border-y border-charcoal/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:border-charcoal transition-all">
                <s.icon size={20} className={s.color} />
                <span className="text-xl md:text-2xl font-black text-offwhite">{s.value}</span>
                <span className="text-xs text-offwhite/45 text-center font-medium">{s.label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── LIVE REVIEWS SHOWCASE ────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="text-coral font-semibold text-xs uppercase tracking-widest">Live Feed Preview</span>
                <h2 className="text-3xl md:text-4xl font-black mt-2">
                  What the community is saying
                </h2>
                <p className="text-offwhite/50 mt-2 max-w-lg">
                  Real area safety reviews from GuardHer members — updated in real-time.
                </p>
              </div>
              {/* Live badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live via WebSocket
              </div>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {sampleReviews.map((r, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className={`rounded-2xl border p-5 ${r.bg} ${r.border} hover:-translate-y-0.5 transition-all duration-200`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lavender to-coral flex items-center justify-center text-navy font-black text-sm shrink-0">
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-offwhite text-sm">{r.user}</p>
                        <div className="flex items-center gap-1 text-offwhite/40 text-xs">
                          <Clock size={10} /> {r.time}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${r.badge}`}>
                      {r.emoji} {r.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={13} className={r.color} />
                    <span className={`font-bold text-sm ${r.color}`}>{r.area}</span>
                  </div>
                  <p className="text-offwhite/65 text-sm leading-relaxed">{r.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA to full reviews page */}
          <FadeUp delay={0.2}>
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-lavender text-navy font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-lavender/90 shadow-[0_4px_20px_rgba(196,181,253,0.25)] hover:shadow-[0_4px_28px_rgba(196,181,253,0.4)] transition-all hover:-translate-y-0.5 text-[15px]"
              >
                Log in to See the Full Live Feed <ChevronRight size={18} />
              </Link>
              <p className="text-offwhite/35 text-sm mt-3">
                Real-time reviews visible after login · Free to join
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 bg-[#0A1628]/50">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-lavender font-semibold text-xs uppercase tracking-widest">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 mb-2 md:mb-3">
                Your review in{" "}
                <span className="text-coral">3 simple steps</span>
              </h2>
              <p className="text-offwhite/50 max-w-lg mx-auto">
                Contributing to community safety has never been easier.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div className="text-center p-7 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:border-charcoal hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-5 ${step.bg}`}>
                    <step.icon size={26} className={step.color} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-offwhite/25 block mb-2">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-offwhite mb-3">{step.title}</h3>
                  <p className="text-offwhite/55 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS LIST ────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeUp>
            <span className="text-lavender font-semibold text-xs uppercase tracking-widest">Why Join</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-5">
              Safety is stronger{" "}
              <span className="text-lavender">together</span>
            </h2>
            <p className="text-offwhite/55 leading-relaxed mb-8">
              When women share safety information openly, dangerous areas get flagged
              early and safe routes get discovered faster. You're not just reviewing
              an area — you're building a shield for every woman who walks through it.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-6 sm:px-7 py-3.5 rounded-xl hover:bg-coral/90 transition-all hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(255,107,107,0.3)]"
            >
              Start Contributing <ArrowRight size={16} />
            </Link>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="p-8 rounded-3xl border border-charcoal/60 bg-midnight/40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center">
                  <Heart size={18} className="text-coral" />
                </div>
                <h3 className="font-bold text-offwhite text-lg">Community Features</h3>
              </div>
              <ul className="space-y-3.5">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-coral mt-0.5 shrink-0" />
                    <span className="text-offwhite/70 text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/8 via-midnight to-lavender/8 p-8 sm:p-12 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-coral/15 border border-coral/25 flex items-center justify-center mx-auto mb-5">
                  <TrendingUp size={24} className="text-coral" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  Ready to make a{" "}
                  <span className="text-coral">difference?</span>
                </h2>
                <p className="text-offwhite/55 max-w-md mx-auto mb-8">
                  Create your free account and start sharing area safety reviews
                  that help women across India make safer choices every day.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-7 sm:px-8 py-4 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.4)] hover:shadow-[0_4px_30px_rgba(255,107,107,0.6)] transition-all hover:-translate-y-0.5 text-base"
                >
                  Join GuardHer Free <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
