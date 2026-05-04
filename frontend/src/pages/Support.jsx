import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, LifeBuoy, MessageCircle, Send, ShieldAlert, HeartHandshake } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Support = () => {
  return (
    <div className="min-h-screen bg-midnight text-offwhite overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-lavender/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lavender/30 bg-lavender/10 text-lavender text-sm font-semibold mb-6"
          >
            <LifeBuoy size={16} /> We're here for you
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5"
          >
            Help & <span className="text-coral">Support</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-base sm:text-lg md:text-xl text-offwhite/60 max-w-2xl mx-auto leading-relaxed"
          >
            Need assistance, have a question, or want to report an issue? Our team is always ready to help you stay safe and connected.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 md:pb-24">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          
          {/* ── CONTACT FORM ──────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <FadeUp delay={0.1}>
              <div className="bg-midnight/60 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-charcoal/50 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center border border-lavender/20">
                    <MessageCircle className="text-lavender" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Send us a message</h2>
                </div>

                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-offwhite/70 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3.5 text-offwhite focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all placeholder:text-offwhite/30" 
                        placeholder="Jane Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-offwhite/70 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3.5 text-offwhite focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all placeholder:text-offwhite/30" 
                        placeholder="jane@example.com" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-offwhite/70 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3.5 text-offwhite focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all placeholder:text-offwhite/30" 
                      placeholder="How can we help?" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-offwhite/70 mb-2">Message</label>
                    <textarea 
                      rows="5" 
                      className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3.5 text-offwhite focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 resize-none transition-all placeholder:text-offwhite/30" 
                      placeholder="Describe your issue or question in detail..."
                    ></textarea>
                  </div>
                  <button 
                    type="button" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coral text-navy font-bold px-8 py-4 rounded-xl hover:bg-coral/90 shadow-[0_4px_20px_rgba(255,107,107,0.25)] hover:shadow-[0_4px_25px_rgba(255,107,107,0.4)] transition-all hover:-translate-y-0.5 mt-2"
                  >
                    Send Message <Send size={18} />
                  </button>
                </form>
              </div>
            </FadeUp>
          </div>

          {/* ── SIDE INFO CARDS ────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <FadeUp delay={0.2}>
              <div className="bg-gradient-to-br from-red-500/10 to-red-900/10 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-red-500/20 shadow-lg relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30 shrink-0">
                    <ShieldAlert className="text-red-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-300 mb-1">Immediate Danger?</h3>
                    <p className="text-sm text-red-200/70 mb-4 leading-relaxed">
                      If you are in immediate physical danger, please contact local emergency services right away.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-red-950/40 px-4 py-3 rounded-lg border border-red-500/20">
                        <span className="text-sm font-medium text-red-200">Police / Emergency</span>
                        <span className="text-xl font-black text-red-400">100 / 112</span>
                      </div>
                      <div className="flex items-center justify-between bg-red-950/40 px-4 py-3 rounded-lg border border-red-500/20">
                        <span className="text-sm font-medium text-red-200">Women Helpline</span>
                        <span className="text-xl font-black text-red-400">1091</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="bg-midnight/40 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-charcoal/50">
                <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center border border-lavender/20 mb-5">
                  <HeartHandshake className="text-lavender" size={24} />
                </div>
                <h3 className="text-xl font-bold text-offwhite mb-2">Partner With Us</h3>
                <p className="text-sm text-offwhite/60 mb-5 leading-relaxed">
                  Are you an NGO, community leader, or organization looking to collaborate on women's safety initiatives?
                </p>
                <a href="mailto:partners@guardher.com" className="inline-flex items-center gap-2 text-lavender hover:text-lavender/80 font-semibold transition-colors">
                  <Mail size={16} /> partners@guardher.com
                </a>
              </div>
            </FadeUp>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Support;
