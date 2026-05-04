import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  MapPin,
  Bell,
  Users,
  Lock,
  Heart,
  Star,
  Zap,
  Eye,
  ArrowRight,
  CheckCircle2,
  Globe,
  Phone,
} from "lucide-react";

/* ─── Reusable fade-up wrapper ─────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Stat counter ──────────────────────────────────────────── */
const StatCard = ({ value, label, icon: Icon, delay }) => (
  <FadeUp delay={delay}>
    <div className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-charcoal/60 bg-midnight/60 backdrop-blur-sm hover:border-lavender/30 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center group-hover:bg-lavender/20 transition-colors">
        <Icon size={22} className="text-lavender" />
      </div>
      <span className="text-3xl font-black text-offwhite">{value}</span>
      <span className="text-sm text-offwhite/55 text-center font-medium">{label}</span>
    </div>
  </FadeUp>
);

/* ─── Feature card ──────────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, desc, color, delay }) => (
  <FadeUp delay={delay}>
    <div className="group p-6 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:bg-midnight/80 hover:border-coral/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,107,0.08)]">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-offwhite mb-2 group-hover:text-lavender transition-colors">
        {title}
      </h3>
      <p className="text-offwhite/55 text-sm leading-relaxed">{desc}</p>
    </div>
  </FadeUp>
);

/* ─── Team member card ──────────────────────────────────────── */
const TeamCard = ({ initials, name, role, color, delay }) => (
  <FadeUp delay={delay}>
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:border-lavender/30 transition-all duration-300 hover:-translate-y-1 group">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white mb-4 shadow-lg ${color}`}
      >
        {initials}
      </div>
      <h3 className="text-offwhite font-bold text-lg group-hover:text-lavender transition-colors">
        {name}
      </h3>
      <p className="text-offwhite/50 text-sm mt-1">{role}</p>
    </div>
  </FadeUp>
);

/* ════════════════════════════════════════════════════════════ */
const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const features = [
    {
      icon: Bell,
      title: "Instant SOS Alerts",
      desc: "One-tap emergency signal sent to your trusted contacts with precise GPS coordinates in seconds.",
      color: "bg-coral/80",
    },
    {
      icon: MapPin,
      title: "Real-Time Safety Map",
      desc: "Live heat-map overlaying crowd-sourced danger zones and verified safe corridors near you.",
      color: "bg-lavender/70",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      desc: "End-to-end encryption protects your location data. Your privacy is non-negotiable.",
      color: "bg-emerald-500/70",
    },
    {
      icon: Users,
      title: "Trusted Contacts",
      desc: "Build your safety circle — family and friends receive instant alerts and can track you live.",
      color: "bg-sky-500/70",
    },
    {
      icon: Eye,
      title: "Community Reviews",
      desc: "Real women share real-time area safety ratings, building a crowd-sourced safety intelligence.",
      color: "bg-amber-500/70",
    },
    {
      icon: Zap,
      title: "AI Safety Insights",
      desc: "Predictive analytics surface risky patterns before you encounter them, keeping you one step ahead.",
      color: "bg-purple-500/70",
    },
  ];

  const team = [
    {
      initials: "PS",
      name: "Prateek Sharma",
      role: "Lead Developer",
      color: "bg-gradient-to-br from-coral to-pink-600",
    },
    {
      initials: "AK",
      name: "Ananya Kapoor",
      role: "UX Designer",
      color: "bg-gradient-to-br from-lavender to-purple-600",
    },
    {
      initials: "RV",
      name: "Riya Verma",
      role: "Backend Engineer",
      color: "bg-gradient-to-br from-sky-400 to-blue-600",
    },
    {
      initials: "NM",
      name: "Neha Mehta",
      role: "Community Lead",
      color: "bg-gradient-to-br from-emerald-400 to-green-600",
    },
  ];

  const values = [
    "Safety as a fundamental right",
    "Privacy-first engineering",
    "Community-driven intelligence",
    "Inclusive design for every woman",
    "Transparent & accountable AI",
    "Zero compromise on reliability",
  ];

  return (
    <div className="min-h-screen bg-midnight text-offwhite overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-lavender/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-coral/30 bg-coral/10 text-coral text-sm font-semibold mb-6"
          >
            <Shield size={15} />
            Empowering Women Everywhere
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-5"
          >
            About{" "}
            <span className="bg-gradient-to-r from-lavender via-coral to-pink-400 bg-clip-text text-transparent">
              GuardHer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-offwhite/65 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10"
          >
            GuardHer is a smart safety platform built by women, for women —
            combining real-time geolocation, AI-powered insights, and a
            compassionate community to keep you safe every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-6 sm:px-7 py-3.5 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.35)] hover:shadow-[0_4px_28px_rgba(255,107,107,0.55)] transition-all hover:-translate-y-0.5"
            >
              Get Protected Now <ArrowRight size={17} />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 border border-charcoal text-offwhite/80 font-semibold px-6 sm:px-7 py-3.5 rounded-xl hover:border-lavender/50 hover:text-lavender transition-all"
            >
              Explore Resources
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 border-y border-charcoal/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="50K+" label="Protected Users" icon={Shield} delay={0} />
          <StatCard value="200+" label="Cities Covered" icon={Globe} delay={0.1} />
          <StatCard value="99.9%" label="Uptime SLA" icon={Zap} delay={0.2} />
          <StatCard value="4.9★" label="App Rating" icon={Star} delay={0.3} />
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left copy */}
          <div>
            <FadeUp>
              <span className="text-coral font-semibold text-sm uppercase tracking-widest">
                Our Mission
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-5 md:mb-6 leading-tight">
                Safety shouldn't be a{" "}
                <span className="text-coral">privilege</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-offwhite/60 text-lg leading-relaxed mb-6">
                Every 33 seconds, a woman becomes a victim of violent crime. We
                built GuardHer because we believe technology has a duty to close
                that gap — making personal safety accessible, instant, and
                intelligent for everyone.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-offwhite/60 text-lg leading-relaxed">
                From a single SOS tap to AI-driven danger predictions, GuardHer
                gives you the tools to move through the world with confidence and
                the backup you deserve.
              </p>
            </FadeUp>
          </div>

          {/* Right: values list */}
          <FadeUp delay={0.15}>
            <div className="p-8 rounded-3xl border border-charcoal/60 bg-midnight/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-lavender/10 flex items-center justify-center">
                  <Heart size={20} className="text-lavender" />
                </div>
                <h3 className="text-xl font-bold text-offwhite">
                  What We Stand For
                </h3>
              </div>
              <ul className="space-y-3">
                {values.map((v, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-coral mt-0.5 shrink-0"
                    />
                    <span className="text-offwhite/75 text-[15px]">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#0A1628]/60">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-lavender font-semibold text-sm uppercase tracking-widest">
                Platform Features
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-3 md:mb-4">
                Everything you need,{" "}
                <span className="text-lavender">nothing you don't</span>
              </h2>
              <p className="text-offwhite/55 max-w-xl mx-auto text-lg">
                Thoughtfully designed features that work seamlessly together to
                create your personal safety shield.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-coral font-semibold text-sm uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3">
                Simple. Fast.{" "}
                <span className="text-coral">Reliable.</span>
              </h2>
            </div>
          </FadeUp>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%)] right-[calc(16.67%)] h-px bg-gradient-to-r from-coral/30 via-lavender/50 to-coral/30" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Sign Up in Seconds",
                  desc: "Create your free account and add your trusted emergency contacts.",
                  color: "bg-coral",
                },
                {
                  step: "02",
                  icon: MapPin,
                  title: "Share Your Journey",
                  desc: "Enable location and let GuardHer watch over you quietly in the background.",
                  color: "bg-lavender",
                },
                {
                  step: "03",
                  icon: Bell,
                  title: "One Tap Safety",
                  desc: "Hit SOS and your contacts + authorities receive instant alerts with your GPS location.",
                  color: "bg-emerald-500",
                },
              ].map((s, i) => (
                <FadeUp key={i} delay={i * 0.15}>
                  <div className="text-center relative">
                    <div
                      className={`w-20 h-20 rounded-2xl ${s.color}/20 border border-${s.color}/30 flex items-center justify-center mx-auto mb-5 relative z-10`}
                    >
                      <s.icon
                        size={28}
                        className={
                          s.color === "bg-coral"
                            ? "text-coral"
                            : s.color === "bg-lavender"
                            ? "text-lavender"
                            : "text-emerald-400"
                        }
                      />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-offwhite/30 uppercase">
                      Step {s.step}
                    </span>
                    <h3 className="text-xl font-bold text-offwhite mt-2 mb-3">
                      {s.title}
                    </h3>
                    <p className="text-offwhite/55 text-sm leading-relaxed max-w-xs mx-auto">
                      {s.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#0A1628]/60">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-lavender font-semibold text-sm uppercase tracking-widest">
                The Team
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mt-3 mb-3 md:mb-4">
                Built with{" "}
                <span className="text-coral">passion & purpose</span>
              </h2>
              <p className="text-offwhite/55 max-w-xl mx-auto">
                A dedicated team of engineers, designers, and advocates united by
                one mission — making every woman feel safe.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <TeamCard key={i} {...t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/10 via-midnight to-lavender/10 p-7 sm:p-10 md:p-12 text-center">
              {/* Decorative glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent" />
              <div className="absolute -top-20 left-1/4 w-60 h-60 bg-coral/8 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 right-1/4 w-60 h-60 bg-lavender/8 rounded-full blur-[80px]" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-coral/15 border border-coral/25 flex items-center justify-center mx-auto mb-6">
                  <Shield size={28} className="text-coral" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                  Ready to feel{" "}
                  <span className="text-coral">safe again?</span>
                </h2>
                <p className="text-offwhite/60 text-lg mb-8 max-w-lg mx-auto">
                  Join thousands of women who trust GuardHer every day. It's
                  free, it's fast, and it could save your life.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-7 sm:px-8 py-4 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.4)] hover:shadow-[0_4px_30px_rgba(255,107,107,0.6)] transition-all hover:-translate-y-0.5 text-base"
                  >
                    Create Free Account <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/support"
                    className="inline-flex items-center justify-center gap-2 border border-charcoal text-offwhite/80 font-semibold px-7 sm:px-8 py-4 rounded-xl hover:border-lavender/50 hover:text-lavender transition-all text-base"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────────────── */}
      <div className="text-center py-8 border-t border-charcoal/40 text-offwhite/30 text-sm">
        © {new Date().getFullYear()} GuardHer · Built with{" "}
        <Heart size={13} className="inline text-coral" /> for women's safety
      </div>
    </div>
  );
};

export default About;
