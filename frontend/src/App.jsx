import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from "./pages/LandingPage";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/player" element={<VideoPlayerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
