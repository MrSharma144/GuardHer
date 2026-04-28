import React from 'react';

const Community = () => {
  return (
    <div className="pt-[73px] min-h-screen bg-navy text-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-lavender mb-6">Our <span className="text-coral">Community</span></h1>
        <p className="text-lg text-offwhite/80 mb-10">Connect, share, and support each other in our safe space.</p>
        
        <div className="space-y-6">
          {/* Placeholder Posts */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-midnight p-6 rounded-xl border border-charcoal">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-navy border border-coral/30 flex items-center justify-center text-lavender font-bold">
                  U{i}
                </div>
                <div>
                  <h4 className="font-bold text-offwhite">User {i}</h4>
                  <p className="text-xs text-offwhite/60">2 hours ago</p>
                </div>
              </div>
              <p className="text-offwhite/80">
                This is a placeholder post for the community forum. Users can share their experiences, ask for advice, or provide support to others in the GuardHer network.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
