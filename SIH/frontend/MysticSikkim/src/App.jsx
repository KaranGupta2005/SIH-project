import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import Map from "./pages/Map";
import Archives from "./pages/Archives";
import Calendar from "./pages/Calendar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FloatingChatbot from "./components/chatbot";
import ContactUs from "./pages/ContactUs";
import DashBoard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden scroll-smooth">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <main className="flex-1 pt-20">
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
          </Routes>
        </main>

        {/* Floating Chatbot */}
        <FloatingChatbot />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;


