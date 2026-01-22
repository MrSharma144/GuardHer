import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "../services/auth";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

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
      const res = await loginUser(form);
      const { token, user } = res.data;
      localStorage.setItem("guardher_token", token);
      setAuthToken(token);
      navigate("/profile");
      setMsg({ type: "success", text: "Login successful. Redirecting..." });
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "Login failed.";
      setMsg({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2540] text-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#0F172A] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-[#C4B5FD] mb-4">Log in</h2>

        <label className="block mb-3">
          <span className="text-sm text-[#F9FAFB]">Email</span>
          <div className="flex items-center mt-1 bg-[#071827] rounded-md px-3 py-2">
            <Mail className="text-[#C4B5FD] mr-2" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-[#F9FAFB]"
              placeholder="you@example.com"
            />
          </div>
        </label>

        <label className="block mb-4">
          <span className="text-sm text-[#F9FAFB]">Password</span>
          <div className="flex items-center mt-1 bg-[#071827] rounded-md px-3 py-2">
            <Lock className="text-[#C4B5FD] mr-2" />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-[#F9FAFB]"
              placeholder="Enter your password"
            />
          </div>
        </label>

        {msg && (
          <div className={`mb-3 p-2 rounded ${msg.type === "error" ? "bg-red-600/10 text-red-300" : "bg-green-600/10 text-green-300"}`}>
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF6B6B] hover:bg-[#E55A5A] py-2 rounded-lg text-white font-semibold"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-3 text-sm text-[#C4B5FD]">
          New here? <span className="text-[#FF6B6B] cursor-pointer" onClick={() => navigate("/signup")}>Create account</span>
        </p>
      </form>
    </div>
  );
}
