import React from 'react';

const Settings = () => {
  return (
    <div className="pt-2">
      <h2 className="text-3xl font-black text-lavender mb-6">Account <span className="text-coral">Settings</span></h2>
      <p className="text-lg text-offwhite/70 mb-8">Manage your profile, preferences, and notifications.</p>

      <div className="bg-midnight p-8 rounded-2xl border border-charcoal shadow-xl">
        <h3 className="text-xl font-bold text-offwhite border-b border-charcoal pb-4 mb-6">Notifications</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-offwhite">Emergency Alerts</p>
              <p className="text-sm text-offwhite/60">Receive SMS notifications for active emergencies</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-offwhite">Location Tracking</p>
              <p className="text-sm text-offwhite/60">Continuously update location while app is open</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-offwhite">Email Updates</p>
              <p className="text-sm text-offwhite/60">Receive community news and feature updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-charcoal peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
            </label>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal">
          <h3 className="text-xl font-bold text-offwhite mb-6">Danger Zone Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input type="range" className="w-full accent-coral" min="1" max="10" defaultValue="5" />
              <span className="text-offwhite font-medium min-w-[50px]">5 km</span>
            </div>
            <p className="text-sm text-offwhite/60">Alert radius for matching crime hotspots nearby.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal flex justify-end gap-4">
          <button className="px-6 py-2 rounded-lg text-offwhite bg-navy border border-charcoal hover:bg-navy/80 transition-colors">Discard</button>
          <button className="px-6 py-2 rounded-lg text-navy font-bold bg-coral hover:bg-coral/90 transition-colors shadow-lg shadow-coral/20">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
