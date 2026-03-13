import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const { name, email, password, password2, tc } = form;

    if (!name || !email || !password || !password2) {
      setMsg({ type: "error", text: "Please fill all fields." });
      return;
    }

    if (password !== password2) {
      setMsg({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (!tc) {
      setMsg({ type: "error", text: "Please accept terms & conditions." });
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password, password2, tc });
      setMsg({ type: "success", text: "Signup successful. Redirecting..." });
    } catch (err) {
      console.error(err);
      const message =
        err.data?.errors?.email?.[0] ||
        err.data?.message ||
        "Signup failed. Try again.";
      setMsg({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-offwhite px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-midnight p-8 rounded-2xl shadow-2xl border border-charcoal my-auto"
      >
        <h2 className="text-3xl font-bold text-lavender mb-6 text-center tracking-wide">
          Create Account
        </h2>

        {/* Name */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-offwhite/80">Full Name</span>
          <div className="flex items-center mt-1.5 bg-navy/50 border border-charcoal rounded-lg px-4 py-3 focus-within:border-lavender transition-colors">
            <User className="text-lavender mr-3" size={20} />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-offwhite placeholder-offwhite/40"
              placeholder="Your full name"
            />
          </div>
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-offwhite/80">Email</span>
          <div className="flex items-center mt-1.5 bg-navy/50 border border-charcoal rounded-lg px-4 py-3 focus-within:border-lavender transition-colors">
            <Mail className="text-lavender mr-3" size={20} />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-offwhite placeholder-offwhite/40"
              placeholder="you@example.com"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-offwhite/80">Password</span>
          <div className="flex items-center mt-1.5 bg-navy/50 border border-charcoal rounded-lg px-4 py-3 focus-within:border-lavender transition-colors">
            <Lock className="text-lavender mr-3" size={20} />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-offwhite placeholder-offwhite/40"
              placeholder="Strong password"
            />
          </div>
        </label>

        {/* Confirm Password */}
        <label className="block mb-6">
          <span className="text-sm font-medium text-offwhite/80">Confirm Password</span>
          <div className="flex items-center mt-1.5 bg-navy/50 border border-charcoal rounded-lg px-4 py-3 focus-within:border-lavender transition-colors">
            <Lock className="text-lavender mr-3" size={20} />
            <input
              name="password2"
              type="password"
              value={form.password2}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-offwhite placeholder-offwhite/40"
              placeholder="Re-enter password"
            />
          </div>
        </label>

        {/* Terms */}
        <label className="flex items-center gap-3 mb-6 text-sm text-offwhite/80 cursor-pointer">
          <input
            type="checkbox"
            name="tc"
            checked={form.tc}
            onChange={handleChange}
            className="w-4 h-4 accent-coral rounded border-charcoal bg-navy focus:ring-coral/50"
          />
          <span>I agree to the terms & conditions</span>
        </label>

        {msg && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm text-center ${
              msg.type === "error"
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "bg-green-500/10 text-green-400 border border-green-500/20"
            }`}
          >
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coral hover:bg-coral/90 transition-all py-3 rounded-xl text-navy font-bold text-lg shadow-[0_0_15px_rgba(255,107,107,0.3)] hover:shadow-[0_0_25px_rgba(255,107,107,0.5)] cursor-pointer"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-offwhite/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-coral font-medium hover:underline ml-1"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
