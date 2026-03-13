import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Contacts from "./pages/Contacts";
import EmergencyHistory from "./pages/EmergencyHistory";

// Home landing page wrapper
const Landing = () => (
  <div className="pt-[73px] min-h-screen bg-navy text-offwhite flex flex-col items-center justify-center p-4">
    <h1 className="text-5xl font-black text-lavender mb-6 text-center leading-tight">Empowering Women's<br/><span className="text-coral">Safety Everywhere</span></h1>
    <p className="text-xl text-offwhite/80 max-w-2xl text-center mb-10">GuardHer is your personal safety companion. Set up your emergency contacts and utilize our instant SOS system for immediate assistance when you need it most.</p>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/emergency" element={<EmergencyHistory />} />
        </Route>

        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
