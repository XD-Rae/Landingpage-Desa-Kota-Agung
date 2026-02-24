import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {PublicCampusDataProvider} from "./contexts/PublicCampusDataContext"; // Import PublicCampusDataProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Pelaporan from "./pages/Pelaporan";
import Home from "./pages/Home";
import EventPage from "./pages/informasi/EventPage";
import EventDetailPage from "./pages/informasi/EventDetailPage";
import ProfilDesa from "./pages/ProfilDesa";
import UmkmPage from "./pages/UmkmPage";
import FaninditaFloristPage from "./pages/FaniniditaFloristPage";

function App() {
  return (
    <PublicCampusDataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profildesa" element={<ProfilDesa />} />
              <Route path="/pelaporan" element={<Pelaporan />} />
              <Route path="/UMKM" element={<UmkmPage />} />
              <Route path="/UMKM2" element={<FaninditaFloristPage />} />
              

              <Route path="informasi">
                <Route path="event" element={<EventPage />} />
                <Route path="event/:id" element={<EventDetailPage />} />
            </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PublicCampusDataProvider>
  );
}

export default App;
