import React from 'react';

const Support = () => {
  return (
    <div className="pt-[73px] min-h-screen bg-navy text-offwhite p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-lavender mb-6">Help & <span className="text-coral">Support</span></h1>
        <p className="text-lg text-offwhite/80 mb-8">We are here to assist you. Find answers or reach out to our team.</p>
        
        <div className="bg-midnight p-8 rounded-xl border border-charcoal/50 mb-8">
          <h2 className="text-2xl font-bold text-lavender mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-1">Your Name</label>
              <input type="text" className="w-full bg-navy border border-charcoal rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-coral" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-1">Email Address</label>
              <input type="email" className="w-full bg-navy border border-charcoal rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-coral" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-1">Message</label>
              <textarea rows="4" className="w-full bg-navy border border-charcoal rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-coral resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="bg-coral text-navy font-bold px-6 py-3 rounded-lg hover:bg-coral/90 transition-colors">Send Message</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-midnight p-6 rounded-xl border border-charcoal">
            <h3 className="text-xl font-bold text-lavender mb-2">Emergency Helpline</h3>
            <p className="text-4xl font-black text-coral">911</p>
            <p className="text-sm text-offwhite/60 mt-2">For immediate emergencies</p>
          </div>
          <div className="bg-midnight p-6 rounded-xl border border-charcoal">
            <h3 className="text-xl font-bold text-lavender mb-2">Domestic Abuse Hotline</h3>
            <p className="text-2xl font-bold text-coral">1-800-799-SAFE</p>
            <p className="text-sm text-offwhite/60 mt-2">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
