import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Bell, MapPin, Users, Lock, Zap,
  ArrowRight, CheckCircle2, Star, Heart, Phone
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

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Bell,
    color: "bg-coral/15 border-coral/25 text-coral",
    title: "Instant SOS Alerts",
    desc: "One tap sends your GPS location and an emergency alert to your trusted contacts and authorities in seconds.",
  },
  {
    icon: MapPin,
    color: "bg-lavender/15 border-lavender/25 text-lavender",
    title: "Live Safety Map",
    desc: "See real-time danger zones and safe corridors powered by community-sourced data and AI analytics.",
  },
  {
    icon: Users,
    color: "bg-sky-500/15 border-sky-500/25 text-sky-400",
    title: "Area Safety Reviews",
    desc: "Rate areas you visit and see live ratings from women in your city. Community intelligence, together.",
  },
  {
    icon: Lock,
    color: "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
    title: "Private & Encrypted",
    desc: "End-to-end encrypted. Your location and data are yours alone. Zero compromise on privacy.",
  },
  {
    icon: Zap,
    color: "bg-amber-500/15 border-amber-500/25 text-amber-400",
    title: "AI Safety Predictions",
    desc: "Predictive risk analysis flags unsafe areas before you arrive based on historical patterns.",
  },
  {
    icon: Phone,
    color: "bg-pink-500/15 border-pink-500/25 text-pink-400",
    title: "Trusted Contacts",
    desc: "Set up your safety circle. Family and friends can track you live and receive instant alerts.",
  },
];

const testimonials = [
  {
    initials: "PK",
    name: "Priya Kapoor",
    city: "Delhi",
    text: "GuardHer gave me the confidence to commute late at night. The SOS system is instant and the area reviews are incredibly useful.",
    stars: 5,
    color: "from-coral to-pink-600",
  },
  {
    initials: "AS",
    name: "Anika Singh",
    city: "Mumbai",
    text: "I've already used the SOS button once. My emergency contacts got my exact location within seconds. This app is genuinely life-saving.",
    stars: 5,
    color: "from-lavender to-purple-600",
  },
  {
    initials: "MR",
    name: "Meera Rao",
    city: "Bangalore",
    text: "The community reviews feature is amazing. I check area safety ratings before going anywhere unfamiliar now.",
    stars: 5,
    color: "from-emerald-400 to-teal-600",
  },
];

const stats = [
  { value: "50K+", label: "Women Protected" },
  { value: "200+", label: "Cities Active" },
  { value: "1.2M+", label: "SOS Alerts Sent" },
  { value: "99.9%", label: "Uptime Reliability" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight text-offwhite overflow-x-hidden">

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-coral/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lavender/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-coral/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-coral/30 bg-coral/10 text-coral text-sm font-semibold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            Protecting Women Across India
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-5 md:mb-6"
          >
            Empowering{" "}
            <span className="bg-gradient-to-r from-lavender via-pink-300 to-coral bg-clip-text text-transparent">
              Women's
            </span>
            <br />
            Safety{" "}
            <span className="text-coral">Everywhere</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-offwhite/60 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 px-2"
          >
            GuardHer is your personal safety companion — real-time SOS alerts,
            crowd-sourced area reviews, and AI-powered insights to keep you safe
            at every step.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 md:mb-16 w-full sm:w-auto"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-black px-7 sm:px-9 py-4 rounded-xl text-base hover:bg-coral/90 shadow-[0_6px_24px_rgba(255,107,107,0.4)] hover:shadow-[0_8px_32px_rgba(255,107,107,0.6)] transition-all hover:-translate-y-1"
            >
              Get Protected Free <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-charcoal/70 text-offwhite/80 font-semibold px-7 sm:px-9 py-4 rounded-xl text-base hover:border-lavender/40 hover:text-lavender transition-all"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-offwhite/40"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> No Credit Card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> End-to-End Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> Works Offline
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-offwhite/20"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-offwhite/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 px-4 sm:px-6 border-y border-charcoal/40 bg-midnight/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-offwhite mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-offwhite/40 font-medium">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-lavender font-semibold text-xs uppercase tracking-widest">Features</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-3 md:mb-4">
                Your complete{" "}
                <span className="text-lavender">safety toolkit</span>
              </h2>
              <p className="text-offwhite/50 max-w-xl mx-auto text-lg">
                Everything you need to stay safe — all in one powerful platform, always in your pocket.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="group p-6 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:bg-midnight/70 hover:-translate-y-1 hover:border-charcoal transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.color}`}>
                    <f.icon size={21} />
                  </div>
                  <h3 className="text-lg font-bold text-offwhite mb-2 group-hover:text-lavender transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-offwhite/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#0A1628]/50">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-coral font-semibold text-xs uppercase tracking-widest">Get Started</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3">
                Up and running in{" "}
                <span className="text-coral">60 seconds</span>
              </h2>
            </div>
          </FadeUp>

          <div className="relative grid md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-coral/20 via-lavender/40 to-coral/20" />
            {[
              {
                n: "01", icon: Shield, c: "text-coral bg-coral/10 border-coral/25",
                t: "Create Account", d: "Sign up for free in under a minute. No payment required, ever."
              },
              {
                n: "02", icon: Users, c: "text-lavender bg-lavender/10 border-lavender/25",
                t: "Add Your Contacts", d: "Add family and friends as your emergency safety circle."
              },
              {
                n: "03", icon: Bell, c: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
                t: "Stay Protected", d: "Enable location and your GuardHer shield is always on."
              },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center mx-auto mb-5 z-10 relative ${s.c}`}>
                    <s.icon size={28} />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-offwhite/25 uppercase block mb-2">Step {s.n}</span>
                  <h3 className="text-xl font-bold text-offwhite mb-3">{s.t}</h3>
                  <p className="text-offwhite/50 text-sm leading-relaxed max-w-xs mx-auto">{s.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="text-center mt-14">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-coral text-navy font-bold px-9 py-4 rounded-xl hover:bg-coral/90 shadow-[0_4px_22px_rgba(255,107,107,0.4)] transition-all hover:-translate-y-0.5 text-base"
              >
                Create Free Account <ArrowRight size={18} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-lavender font-semibold text-xs uppercase tracking-widest">Stories</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-3 md:mb-4">
                Real women,{" "}
                <span className="text-lavender">real safety</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {testimonials.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="h-full flex flex-col p-6 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:border-charcoal hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array(t.stars).fill(0).map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-offwhite/70 text-sm leading-relaxed flex-1 mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-charcoal/40">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-offwhite text-sm">{t.name}</p>
                      <p className="text-xs text-offwhite/40">{t.city}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 pb-16 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/10 via-midnight to-lavender/10 p-8 sm:p-12 md:p-16 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent" />
              <div className="absolute -top-24 left-1/4 w-64 h-64 bg-coral/6 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-lavender/6 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-coral/15 border border-coral/25 flex items-center justify-center mx-auto mb-6">
                  <Heart size={28} className="text-coral" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                  Your safety starts{" "}
                  <span className="text-coral">today</span>
                </h2>
                <p className="text-offwhite/60 text-lg mb-9 max-w-lg mx-auto">
                  Join 50,000+ women who trust GuardHer every single day.
                  It's free. It's fast. And it could save your life.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-black px-7 sm:px-9 py-4 rounded-xl hover:bg-coral/90 shadow-[0_4px_24px_rgba(255,107,107,0.45)] hover:shadow-[0_6px_32px_rgba(255,107,107,0.65)] transition-all hover:-translate-y-1 text-base"
                  >
                    Get Started Free <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/community"
                    className="inline-flex items-center justify-center gap-2 border border-charcoal text-offwhite/75 font-semibold px-7 sm:px-9 py-4 rounded-xl hover:border-lavender/40 hover:text-lavender transition-all text-base"
                  >
                    View Community
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ FOOTER NOTE ════════════════════════════════════════ */}
      <div className="text-center py-8 border-t border-charcoal/40 text-offwhite/25 text-sm">
        © {new Date().getFullYear()} GuardHer · Built with{" "}
        <Heart size={12} className="inline text-coral" /> for women's safety everywhere
      </div>
    </div>
  );
}
