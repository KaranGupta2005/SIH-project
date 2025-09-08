import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import Map from "./pages/Map";
import Archives from "./pages/Archives";
import Calendar from "./pages/Calendar";
import FloatingChatbot from "./components/chatbot";

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden overflow-y-auto scroll-smooth">
        
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <section className="flex-1 mt-24"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/virtualTour" element={<VirtualTour />} />
            <Route path="/exploreMap" element={<Map />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </section>
        <FloatingChatbot />
        <Footer/>

      </div>
    </BrowserRouter>
  );
}

export default App;


