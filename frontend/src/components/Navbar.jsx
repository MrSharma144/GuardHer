import { useState } from "react";
import { Shield, Menu, X, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-midnight/90 backdrop-blur-md text-offwhite border-b border-charcoal/50 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-coral/10 rounded-xl group-hover:bg-coral/20 transition-colors">
            <Shield size={28} className="text-coral" />
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-lavender">
            Guard<span className="text-coral">Her</span>
          </h1>
        </Link>

        {/* NAV LINKS DKTOP */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-offwhite/80">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-coral transition-colors">Dashboard</Link>
              <Link to="/contacts" className="hover:text-coral transition-colors">Contacts</Link>
              <Link to="/emergency" className="hover:text-coral transition-colors">Alert History</Link>
              <Link to="/resources" className="hover:text-coral transition-colors">Resources</Link>
              <Link to="/community" className="hover:text-coral transition-colors">Community</Link>
              <Link to="/support" className="hover:text-coral transition-colors">Support</Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-coral transition-colors">Home</Link>
              <Link to="/about" className="hover:text-coral transition-colors">About</Link>
              <Link to="/resources" className="hover:text-coral transition-colors">Resources</Link>
              <Link to="/community" className="hover:text-coral transition-colors">Community</Link>
              <Link to="/support" className="hover:text-coral transition-colors">Support</Link>
            </>
          )}
        </div>

        {/* AUTH SECTION DKTOP */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-lavender/10 transition-colors text-lavender cursor-pointer mr-2">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-offwhite/80 hover:text-lavender transition-colors">
                <div className="w-8 h-8 rounded-full bg-navy border border-charcoal flex items-center justify-center">
                  <UserIcon size={16} />
                </div>
                <span className="hidden lg:block truncate max-w-[120px]">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 border border-charcoal px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lavender px-4 py-2 rounded-lg text-sm font-semibold hover:bg-lavender/10 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-coral text-navy px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-coral/90 shadow-[0_4px_10px_rgba(255,107,107,0.2)] hover:shadow-[0_4px_15px_rgba(255,107,107,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON & THEME TOGGLE */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-lavender hover:bg-navy/50 transition-colors focus:outline-none cursor-pointer">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            className="p-2 rounded-lg bg-navy/50 text-lavender hover:bg-navy transition-colors focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-midnight border-t border-charcoal px-6 py-6 flex flex-col gap-5 text-lg shadow-2xl absolute w-full animate-in fade-in slide-in-from-top-4 duration-200">
          
          {user ? (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-charcoal">
                <div className="w-10 h-10 rounded-full bg-navy border border-charcoal flex items-center justify-center">
                  <UserIcon size={20} className="text-lavender" />
                </div>
                <div>
                  <p className="font-semibold text-offwhite">{user.name}</p>
                  <p className="text-sm text-offwhite/60">{user.email}</p>
                </div>
              </div>
              <a href="/dashboard#overview" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Dashboard Home</a>
              <a href="/dashboard#map" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Safety Map</a>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Profile</Link>
              <a href="/dashboard#contacts" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Contacts</a>
              <a href="/dashboard#history" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Alert History</a>
              <Link to="/resources" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Resources</Link>
              <Link to="/community" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Community</Link>
              <Link to="/support" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Support</Link>
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 mt-2 border border-charcoal bg-red-500/5 text-red-400 py-3 rounded-xl w-full hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">About</Link>
              <Link to="/resources" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Resources</Link>
              <Link to="/community" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Community</Link>
              <Link to="/support" onClick={() => setIsOpen(false)} className="text-offwhite/80 hover:text-coral transition-colors">Support</Link>
              
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center border border-charcoal text-lavender bg-navy/30 px-4 py-3 rounded-xl font-medium hover:bg-navy/50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-coral text-navy px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-coral/90 transition-all"
                >
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
