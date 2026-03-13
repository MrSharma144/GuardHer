import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Save } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-lavender tracking-tight">My Profile</h1>
        <p className="text-offwhite/60 mt-1">Manage your personal information and account settings.</p>
      </header>

      <div className="bg-midnight border border-charcoal p-8 rounded-3xl shadow-xl">
        <div className="flex items-start gap-6 mb-8 border-b border-charcoal pb-8">
          <div className="w-24 h-24 rounded-full bg-navy border-4 border-charcoal flex items-center justify-center shrink-0">
            <User size={40} className="text-lavender" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-offwhite">{user?.name}</h2>
            <div className="flex items-center gap-2 text-offwhite/60">
              <Mail size={16} />
              {user?.email}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-2.5 py-1 rounded-md text-xs font-medium mt-2">
              <Shield size={14} /> Account Verified
            </div>
          </div>
        </div>

        <form className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-sm font-medium text-offwhite/80 block mb-2">Full Name</span>
              <input
                type="text"
                defaultValue={user?.name}
                disabled
                className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3 text-offwhite opacity-70 cursor-not-allowed"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-offwhite/80 block mb-2">Email Address</span>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3 text-offwhite opacity-70 cursor-not-allowed"
              />
            </label>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 bg-charcoal text-offwhite/50 px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
            >
              <Save size={18} /> Update Profile
            </button>
          </div>
          <p className="text-xs text-offwhite/40 text-right mt-2">Profile updates are currently disabled in this demo.</p>
        </form>
      </div>
    </div>
  );
}
