import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import {
  User, Mail, Phone, FileText, Shield, Save, Lock,
  Eye, EyeOff, CheckCircle, XCircle, AlertTriangle,
  UserCheck, Heart, Edit3, Camera, RefreshCw
} from "lucide-react";

// ─── Toast Component ──────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md text-sm font-medium transition-all duration-300 ${
            t.type === "success"
              ? "bg-green-500/20 border-green-500/40 text-green-300"
              : t.type === "error"
              ? "bg-red-500/20 border-red-500/40 text-red-300"
              : "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
          }`}
        >
          {t.type === "success" ? (
            <CheckCircle size={18} />
          ) : t.type === "error" ? (
            <XCircle size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ title, icon: Icon, iconColor = "text-lavender", children }) {
  return (
    <div className="bg-midnight border border-charcoal rounded-3xl shadow-xl overflow-hidden">
      <div className="flex items-center gap-3 px-8 py-5 border-b border-charcoal bg-navy/30">
        <div className={`p-2 rounded-xl bg-charcoal/50 ${iconColor}`}>
          <Icon size={20} />
        </div>
        <h2 className="text-lg font-bold text-offwhite">{title}</h2>
      </div>
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function Field({ label, id, type = "text", value, onChange, placeholder = "", disabled = false, maxLength, rows }) {
  const baseClass =
    "w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-lavender/60 focus:ring-1 focus:ring-lavender/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm";

  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-2">
        {label}
      </span>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={baseClass}
        />
      )}
    </label>
  );
}

// ─── Password Field ───────────────────────────────────────────────────────────
function PasswordField({ label, id, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <label className="block" htmlFor={id}>
      <span className="text-xs font-semibold uppercase tracking-wider text-offwhite/50 block mb-2">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-3 pr-12 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-lavender/60 focus:ring-1 focus:ring-lavender/30 transition-all text-sm"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-offwhite/40 hover:text-offwhite/80 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-rose-500 to-orange-400",
    "from-emerald-500 to-teal-400",
  ];
  const color = colors[(initials.charCodeAt(0) || 0) % colors.length];

  return (
    <div
      className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-lg text-white text-3xl font-black select-none`}
    >
      {initials}
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
export default function Profile() {
  const { user, setUser } = useAuth();
  const [toasts, setToasts] = useState([]);

  // Personal Info state
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    bio: "",
  });
  const [infoLoading, setInfoLoading] = useState(false);

  // Emergency Contact state
  const [emergency, setEmergency] = useState({
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
  });
  const [emergencyLoading, setEmergencyLoading] = useState(false);

  // Change Password state
  const [pwd, setPwd] = useState({ password: "", password2: "" });
  const [pwdLoading, setPwdLoading] = useState(false);

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      setInfo({
        name: user.name || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
      setEmergency({
        emergency_contact_name: user.emergency_contact_name || "",
        emergency_contact_phone: user.emergency_contact_phone || "",
        emergency_contact_relation: user.emergency_contact_relation || "",
      });
    }
  }, [user]);

  // Toast helper
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  // ── Save Personal Info ───────────────────────────────────────────────────
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    if (!info.name.trim()) {
      addToast("Full name is required.", "error");
      return;
    }
    setInfoLoading(true);
    try {
      const updated = await api.patch("/user/profile/", {
        name: info.name.trim(),
        phone: info.phone.trim(),
        bio: info.bio.trim(),
      });
      setUser((prev) => ({ ...prev, ...updated }));
      addToast("Profile updated successfully!", "success");
    } catch (err) {
      addToast("Failed to update profile. Please try again.", "error");
    } finally {
      setInfoLoading(false);
    }
  };

  // ── Save Emergency Contact ───────────────────────────────────────────────
  const handleSaveEmergency = async (e) => {
    e.preventDefault();
    setEmergencyLoading(true);
    try {
      const updated = await api.patch("/user/profile/", {
        emergency_contact_name: emergency.emergency_contact_name.trim(),
        emergency_contact_phone: emergency.emergency_contact_phone.trim(),
        emergency_contact_relation: emergency.emergency_contact_relation.trim(),
      });
      setUser((prev) => ({ ...prev, ...updated }));
      addToast("Emergency contact saved!", "success");
    } catch (err) {
      addToast("Failed to save emergency contact.", "error");
    } finally {
      setEmergencyLoading(false);
    }
  };

  // ── Change Password ──────────────────────────────────────────────────────
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!pwd.password || !pwd.password2) {
      addToast("Please fill in both password fields.", "warning");
      return;
    }
    if (pwd.password.length < 8) {
      addToast("Password must be at least 8 characters.", "warning");
      return;
    }
    if (pwd.password !== pwd.password2) {
      addToast("Passwords do not match.", "error");
      return;
    }
    setPwdLoading(true);
    try {
      await api.post("/user/change-password/", {
        password: pwd.password,
        password2: pwd.password2,
      });
      setPwd({ password: "", password2: "" });
      addToast("Password changed successfully!", "success");
    } catch (err) {
      addToast("Failed to change password. Please try again.", "error");
    } finally {
      setPwdLoading(false);
    }
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "—";

  return (
    <>
      <Toast toasts={toasts} />

      <div className="max-w-3xl mx-auto space-y-8 pb-10">
        {/* ── Page Header ── */}
        <header>
          <h1 className="text-3xl font-black text-lavender tracking-tight">
            My <span className="text-coral">Profile</span>
          </h1>
          <p className="text-offwhite/50 mt-1 text-sm">
            Manage your personal information, security, and emergency contacts.
          </p>
        </header>

        {/* ── Profile Hero Card ── */}
        <div className="bg-midnight border border-charcoal rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group shrink-0">
            <Avatar name={user?.name} />
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-black text-offwhite">{user?.name || "—"}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-offwhite/50 text-sm mt-1">
              <Mail size={14} />
              {user?.email || "—"}
            </div>
            {user?.phone && (
              <div className="flex items-center justify-center sm:justify-start gap-2 text-offwhite/50 text-sm mt-0.5">
                <Phone size={14} />
                {user.phone}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20">
                <Shield size={12} />
                Verified Account
              </span>
              <span className="inline-flex items-center gap-1.5 bg-lavender/10 text-lavender px-3 py-1 rounded-full text-xs font-semibold border border-lavender/20">
                Member since {memberSince}
              </span>
            </div>
            {user?.bio && (
              <p className="mt-3 text-offwhite/60 text-sm leading-relaxed max-w-md">{user.bio}</p>
            )}
          </div>
        </div>

        {/* ── Personal Information ── */}
        <SectionCard title="Personal Information" icon={Edit3}>
          <form onSubmit={handleSaveInfo} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="profile-name"
                label="Full Name"
                value={info.name}
                onChange={(e) => setInfo((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your full name"
                maxLength={100}
              />
              <Field
                id="profile-email"
                label="Email Address"
                value={user?.email || ""}
                disabled
                placeholder="your@email.com"
              />
            </div>
            <Field
              id="profile-phone"
              label="Phone Number"
              type="tel"
              value={info.phone}
              onChange={(e) => setInfo((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              maxLength={20}
            />
            <Field
              id="profile-bio"
              label="Bio / About Me"
              value={info.bio}
              onChange={(e) => setInfo((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Tell us a little about yourself…"
              rows={3}
              maxLength={500}
            />
            {info.bio && (
              <p className="text-xs text-offwhite/30 text-right">
                {info.bio.length}/500
              </p>
            )}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={infoLoading}
                className="inline-flex items-center gap-2 bg-lavender text-navy font-bold px-6 py-2.5 rounded-xl hover:bg-lavender/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-lavender/20 text-sm"
              >
                {infoLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {infoLoading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* ── Emergency Contact ── */}
        <SectionCard title="Emergency Contact" icon={Heart} iconColor="text-coral">
          <p className="text-offwhite/40 text-xs mb-5">
            This contact will be notified in an SOS emergency.
          </p>
          <form onSubmit={handleSaveEmergency} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="ec-name"
                label="Contact Name"
                value={emergency.emergency_contact_name}
                onChange={(e) =>
                  setEmergency((p) => ({ ...p, emergency_contact_name: e.target.value }))
                }
                placeholder="e.g. Priya Sharma"
                maxLength={100}
              />
              <Field
                id="ec-relation"
                label="Relationship"
                value={emergency.emergency_contact_relation}
                onChange={(e) =>
                  setEmergency((p) => ({ ...p, emergency_contact_relation: e.target.value }))
                }
                placeholder="e.g. Mother, Sister, Friend"
                maxLength={50}
              />
            </div>
            <Field
              id="ec-phone"
              label="Contact Phone"
              type="tel"
              value={emergency.emergency_contact_phone}
              onChange={(e) =>
                setEmergency((p) => ({ ...p, emergency_contact_phone: e.target.value }))
              }
              placeholder="+91 98765 43210"
              maxLength={20}
            />
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={emergencyLoading}
                className="inline-flex items-center gap-2 bg-coral text-navy font-bold px-6 py-2.5 rounded-xl hover:bg-coral/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-coral/20 text-sm"
              >
                {emergencyLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <UserCheck size={16} />
                )}
                {emergencyLoading ? "Saving…" : "Save Emergency Contact"}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* ── Change Password ── */}
        <SectionCard title="Change Password" icon={Lock} iconColor="text-yellow-400">
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <PasswordField
                id="pwd-new"
                label="New Password"
                value={pwd.password}
                onChange={(e) => setPwd((p) => ({ ...p, password: e.target.value }))}
                placeholder="Min. 8 characters"
              />
              <PasswordField
                id="pwd-confirm"
                label="Confirm New Password"
                value={pwd.password2}
                onChange={(e) => setPwd((p) => ({ ...p, password2: e.target.value }))}
                placeholder="Re-enter new password"
              />
            </div>

            {/* Password strength hint */}
            {pwd.password && (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((i) => {
                  const strength = Math.min(4, Math.floor(pwd.password.length / 3));
                  return (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= strength
                          ? strength <= 1
                            ? "bg-red-400"
                            : strength === 2
                            ? "bg-yellow-400"
                            : strength === 3
                            ? "bg-blue-400"
                            : "bg-green-400"
                          : "bg-charcoal"
                      }`}
                    />
                  );
                })}
                <span className="text-xs text-offwhite/40 ml-1">
                  {pwd.password.length < 4
                    ? "Weak"
                    : pwd.password.length < 7
                    ? "Fair"
                    : pwd.password.length < 10
                    ? "Good"
                    : "Strong"}
                </span>
              </div>
            )}

            {pwd.password && pwd.password2 && pwd.password !== pwd.password2 && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <XCircle size={13} /> Passwords do not match
              </p>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={pwdLoading}
                className="inline-flex items-center gap-2 bg-yellow-500/90 text-navy font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20 text-sm"
              >
                {pwdLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Lock size={16} />
                )}
                {pwdLoading ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* ── Account Info (read-only) ── */}
        <SectionCard title="Account Details" icon={Shield} iconColor="text-green-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "User ID", value: user?.id ?? "—" },
              { label: "Account Status", value: "Active & Verified" },
              { label: "Member Since", value: memberSince },
              { label: "Email", value: user?.email ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-navy/40 rounded-2xl px-5 py-4 border border-charcoal/60">
                <p className="text-offwhite/40 text-xs uppercase tracking-wider font-semibold mb-1">
                  {label}
                </p>
                <p className="text-offwhite font-medium">{value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
