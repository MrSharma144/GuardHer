import React from 'react';

const Resources = () => {
  return (
    <div className="pt-[73px] min-h-screen bg-navy text-offwhite p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-lavender mb-6">Safety <span className="text-coral">Resources</span></h1>
        <p className="text-lg text-offwhite/80 mb-8">Access our curated guides and resources for women's safety.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-midnight p-6 rounded-xl border border-charcoal/50 hover:border-coral transition-colors">
              <h3 className="text-xl font-bold text-lavender mb-3">Resource Guide {i}</h3>
              <p className="text-offwhite/70 mb-4">Learn essential tips and strategies for personal safety in various situations.</p>
              <button className="text-coral font-medium hover:text-coral/80">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
