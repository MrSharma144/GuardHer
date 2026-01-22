import { useState } from "react";
import { Shield, MapPin, Info, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0F172A] text-[#F9FAFB] shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Shield size={28} className="text-[#FF6B6B]" />
          <h1 className="text-2xl font-semibold tracking-wide text-[#C4B5FD]">
            Guard<span className="text-[#FF6B6B]">Her</span>
          </h1>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <Link to="/" className="hover:text-[#FF6B6B] transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#FF6B6B] transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#FF6B6B] transition-colors">
            Contact
          </Link>
          <Link to="/heatmap" className="hover:text-[#FF6B6B] transition-colors">
            Heatmap
          </Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="border border-[#C4B5FD] px-4 py-2 rounded-lg hover:bg-[#C4B5FD] hover:text-[#0A2540] transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#FF6B6B] px-4 py-2 rounded-lg hover:bg-[#C96464] transition-all"
          >
            Signup
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] px-6 pb-4 flex flex-col gap-4 text-lg">
          <Link to="/" className="hover:text-[#FF6B6B] transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#FF6B6B] transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#FF6B6B] transition-colors">
            Contact
          </Link>
          <Link to="/heatmap" className="hover:text-[#FF6B6B] transition-colors">
            Heatmap
          </Link>

          {/* Auth links on mobile */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              className="border border-[#C4B5FD] px-4 py-2 rounded-lg text-center hover:bg-[#C4B5FD] hover:text-[#0A2540] transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#FF6B6B] px-4 py-2 rounded-lg text-center hover:bg-[#C96464] transition-all"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
