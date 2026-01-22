import SOSButton from "../components/SOSButton";

const About = () => (
  <>
  <SOSButton />
  <div className="pt-20 text-white bg-[#0F172A] min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-semibold text-[#C4B5FD] mb-2">About GuardHer</h1>
    <p className="max-w-xl text-center text-[#F9FAFB]">
      GuardHer is a smart safety platform designed to protect women using real-time
      geolocation, SOS alerts, and predictive safety insights.
    </p>
  </div>
  </>
);
export default About;
