import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen, Shield, Phone, MapPin, Heart, Zap,
  ArrowRight, ExternalLink, AlertTriangle, Lock,
  Users, Bell, ChevronRight, Star
} from "lucide-react";
import { Link } from "react-router-dom";

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

const featured = [
  {
    icon: Shield,
    color: "from-coral/80 to-pink-600/80",
    badge: "Essential",
    badgeColor: "bg-coral/20 text-coral border-coral/30",
    title: "Personal Safety Fundamentals",
    desc: "A comprehensive guide covering situational awareness, body language, safe routes, and how to react in threatening situations.",
    tags: ["Awareness", "Prevention", "Confidence"],
    readTime: "8 min read",
  },
  {
    icon: Phone,
    color: "from-lavender/80 to-purple-600/80",
    badge: "Must Read",
    badgeColor: "bg-lavender/20 text-lavender border-lavender/30",
    title: "Emergency Contacts & Helplines",
    desc: "National emergency numbers, women's helplines, and crisis centers — organized by category for quick access when it matters most.",
    tags: ["Emergency", "Helplines", "India"],
    readTime: "5 min read",
  },
  {
    icon: MapPin,
    color: "from-emerald-500/80 to-teal-600/80",
    badge: "Popular",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "Safe Travel Planning",
    desc: "Tips for planning safe journeys — from verifying transport apps and sharing live location to identifying trusted public spaces.",
    tags: ["Travel", "Maps", "Verification"],
    readTime: "6 min read",
  },
];

const categories = [
  {
    icon: AlertTriangle,
    color: "bg-coral/10 text-coral border-coral/20",
    title: "Self-Defense Basics",
    desc: "Simple, effective techniques that require no prior training. Know when and how to use them.",
    tag: "Physical Safety",
  },
  {
    icon: Lock,
    color: "bg-lavender/10 text-lavender border-lavender/20",
    title: "Digital Safety & Privacy",
    desc: "Protect yourself online — from stalkerware to secure communication apps and privacy settings.",
    tag: "Cyber Safety",
  },
  {
    icon: Heart,
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    title: "Mental Health & Support",
    desc: "Resources for trauma recovery, counseling services, and peer support communities for survivors.",
    tag: "Wellness",
  },
  {
    icon: Users,
    color: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    title: "Community Watch Programs",
    desc: "How to set up and participate in neighborhood safety groups and community surveillance networks.",
    tag: "Community",
  },
  {
    icon: Zap,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    title: "Workplace Safety Rights",
    desc: "Know your legal rights around harassment, unsafe work environments, and how to escalate concerns.",
    tag: "Legal",
  },
  {
    icon: Bell,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    title: "Using GuardHer Effectively",
    desc: "Step-by-step guides to get the most out of every GuardHer feature — SOS, contacts, area reviews, and more.",
    tag: "App Guide",
  },
];

const helplines = [
  { name: "Women Helpline (National)", number: "1091", color: "text-coral", bg: "bg-coral/10 border-coral/25" },
  { name: "Police Emergency", number: "100", color: "text-red-400", bg: "bg-red-500/10 border-red-500/25" },
  { name: "Domestic Violence Helpline", number: "181", color: "text-lavender", bg: "bg-lavender/10 border-lavender/25" },
  { name: "Childline India", number: "1098", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/25" },
  { name: "Medical Emergency", number: "108", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25" },
  { name: "Cyber Crime Helpline", number: "1930", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Resources() {
  return (
    <div className="min-h-screen bg-midnight text-offwhite overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-14 md:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-16 left-1/3 w-80 h-80 bg-lavender/8 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-coral/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lavender/30 bg-lavender/10 text-lavender text-sm font-semibold mb-6"
          >
            <BookOpen size={14} /> Curated Safety Knowledge
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5"
          >
            Safety{" "}
            <span className="bg-gradient-to-r from-lavender to-coral bg-clip-text text-transparent">
              Resources
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-base sm:text-lg text-offwhite/60 max-w-2xl mx-auto leading-relaxed"
          >
            Practical guides, helplines, and expert-curated knowledge — everything
            you need to move through the world with confidence and preparation.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED GUIDES ─────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <FadeUp>
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-coral font-semibold text-xs uppercase tracking-widest">Featured</span>
              <h2 className="text-2xl md:text-3xl font-black mt-1">Start Here</h2>
            </div>
            <span className="text-offwhite/30 text-sm hidden md:block">Most-read guides this month</span>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((g, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="group h-full flex flex-col rounded-2xl border border-charcoal/60 bg-midnight/50 overflow-hidden hover:border-charcoal hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                {/* Card top gradient band */}
                <div className={`h-2 w-full bg-gradient-to-r ${g.color}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center`}>
                      <g.icon size={20} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${g.badgeColor}`}>
                      {g.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-offwhite mb-2 group-hover:text-lavender transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-offwhite/55 text-sm leading-relaxed flex-1 mb-4">{g.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {g.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-navy/60 text-offwhite/40 border border-charcoal/40">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-charcoal/40">
                    <span className="text-xs text-offwhite/35">{g.readTime}</span>
                    <button className="flex items-center gap-1 text-coral text-sm font-semibold group-hover:gap-2 transition-all">
                      Read Guide <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES GRID ──────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-[#0A1628]/50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-lavender font-semibold text-xs uppercase tracking-widest">Browse Topics</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 mb-2 md:mb-3">
                All Resource Categories
              </h2>
              <p className="text-offwhite/50 max-w-lg mx-auto">
                From self-defense basics to digital privacy — find the knowledge that matters most to you.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="group p-5 rounded-2xl border border-charcoal/60 bg-midnight/40 hover:bg-midnight/70 hover:-translate-y-0.5 hover:border-charcoal transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${c.color}`}>
                      <c.icon size={19} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-offwhite text-[15px] group-hover:text-lavender transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold text-offwhite/35 uppercase tracking-wider">
                        {c.tag}
                      </span>
                      <p className="text-offwhite/55 text-sm leading-relaxed mt-2">{c.desc}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="flex items-center gap-1 text-xs text-offwhite/30 group-hover:text-coral transition-colors">
                      Learn more <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY HELPLINES ──────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-coral font-semibold text-xs uppercase tracking-widest">Quick Access</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 mb-2 md:mb-3">
                Emergency Helplines
              </h2>
              <p className="text-offwhite/50 max-w-lg mx-auto">
                Save these numbers. Share them with someone you care about.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {helplines.map((h, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className={`group flex items-center gap-4 p-5 rounded-2xl border ${h.bg} hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${h.bg} border`}>
                    <Phone size={20} className={h.color} />
                  </div>
                  <div>
                    <p className="text-xs text-offwhite/45 font-medium mb-0.5">{h.name}</p>
                    <p className={`text-2xl font-black tracking-wider ${h.color}`}>{h.number}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p className="text-center text-offwhite/30 text-sm mt-8">
              * Numbers are for India. International users should contact local emergency services.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden border border-lavender/20 bg-gradient-to-br from-lavender/8 via-midnight to-coral/8 p-8 sm:p-10 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-px bg-gradient-to-r from-transparent via-lavender/40 to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-lavender/15 border border-lavender/25 flex items-center justify-center mx-auto mb-5">
                  <Star size={24} className="text-lavender" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-3">
                  Want to contribute?
                </h2>
                <p className="text-offwhite/55 mb-7 max-w-md mx-auto">
                  Share area safety reviews and help other women in your community make informed decisions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-3">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-6 sm:px-7 py-3.5 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.3)] transition-all hover:-translate-y-0.5"
                  >
                    Join GuardHer <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/community"
                    className="inline-flex items-center justify-center gap-2 border border-charcoal text-offwhite/75 font-semibold px-6 sm:px-7 py-3.5 rounded-xl hover:border-lavender/40 hover:text-lavender transition-all"
                  >
                    View Community Reviews
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
