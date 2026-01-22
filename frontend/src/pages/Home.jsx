import SOSButton from "../components/SOSButton";

const Home = () => (
  <>
  <SOSButton />
  <div className="flex flex-col items-center justify-center h-screen text-white bg-[#0A2540]">
    <h1 className="text-4xl font-bold text-[#C4B5FD] mb-4">Welcome to GuardHer</h1>
    <p className="text-lg text-[#F9FAFB] max-w-lg text-center">
      Empowering safety through technology — your smart safety companion.
    </p>
  </div>
  </>
);
export default Home;
