import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/chatbot";
import useOfflineStore from "./store/offlineStore";
import useAuthStore from "./store/authStore";

// Eager-load frequently visited pages
import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";

// Lazy-load heavier / less frequently visited pages
const Map = lazy(() => import("./pages/Map"));
const Archives = lazy(() => import("./pages/Archives"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const DashBoard = lazy(() => import("./pages/dashboard"));
const TravelGuide = lazy(() => import("./pages/TravelGuide"));
const Admin = lazy(() => import("./pages/Admin"));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-amber-400/70 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const initListeners = useOfflineStore((s) => s.initListeners);
  const loadMonasteries = useOfflineStore((s) => s.loadMonasteries);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    // Initialize offline detection
    initListeners();
    // Pre-cache monastery data in IndexedDB
    loadMonasteries();
    // Check if user is still authenticated
    fetchMe();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden scroll-smooth">
        <Navbar />

        <main className="flex-1 pt-20">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/virtualtour" element={<VirtualTour />} />
              <Route path="/exploremap" element={<Map />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/travel-guide" element={<TravelGuide />} />
            <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>

        <FloatingChatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
