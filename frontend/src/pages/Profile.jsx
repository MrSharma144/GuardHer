// src/components/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../services/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // if token exists, it's already set by ProtectedRoute, but ensure fallback:
    const token = localStorage.getItem("guardher_token");
    if (token) setAuthToken(token);

    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load profile:", err);
        // If token invalid or network issue, redirect to login
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("guardher_token");
    setAuthToken(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen bg-[#0A2540] text-[#F9FAFB]">
        <div>Loading profile…</div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0A2540] text-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#0F172A] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#C4B5FD]">My Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-[#FF6B6B] text-white px-4 py-2 rounded-md hover:bg-[#E55A5A]"
          >
            Logout
          </button>
        </div>

        {user ? (
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-[#C4B5FD]">Full name</span>
              <span className="text-white">{user.fullname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#C4B5FD]">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#C4B5FD]">Joined</span>
              <span className="text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}
              </span>
            </div>

            {/* optional: edit profile, change password buttons, etc. */}
          </div>
        ) : (
          <div className="mt-6 text-center text-red-300">Unable to load user data.</div>
        )}
      </div>
    </div>
  );
}
