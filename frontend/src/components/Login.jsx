import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!form.email || !form.password) {
      setMsg({ type: "error", text: "Please enter email and password." });
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      // login handles navigation internally, but just in case
      setMsg({ type: "success", text: "Login successful. Redirecting..." });
    } catch (err) {
      console.error(err);
      const message = err.data?.errors?.non_field_errors?.[0] || err.data?.message || "Login failed.";
      setMsg({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-offwhite px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-midnight p-8 rounded-2xl shadow-2xl border border-charcoal">
        <h2 className="text-3xl font-bold text-lavender mb-6 text-center tracking-wide">Welcome Back</h2>

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

        <label className="block mb-6">
          <span className="text-sm font-medium text-offwhite/80">Password</span>
          <div className="flex items-center mt-1.5 bg-navy/50 border border-charcoal rounded-lg px-4 py-3 focus-within:border-lavender transition-colors">
            <Lock className="text-lavender mr-3" size={20} />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-offwhite placeholder-offwhite/40"
              placeholder="Enter your password"
            />
          </div>
        </label>

        {msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${msg.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coral hover:bg-coral/90 transition-all py-3 rounded-xl text-navy font-bold text-lg shadow-[0_0_15px_rgba(255,107,107,0.3)] hover:shadow-[0_0_25px_rgba(255,107,107,0.5)]"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-6 text-center text-sm text-offwhite/70">
          New here? <Link to="/signup" className="text-coral font-medium hover:underline ml-1">Create account</Link>
        </p>
      </form>
    </div>
  );
}
