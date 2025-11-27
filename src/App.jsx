// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Letters from "./pages/Letters";
import LetterView from "./pages/LetterView";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-content">
        <Routes>
          {/* Home shows the gallery */}
          <Route path="/" element={<Gallery />} />
          {/* Explicit /gallery route so the Gallery link works */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/letters" element={<Letters />} />
          <Route
            path="/letters/:name/:price/:chain/:length"
            element={<LetterView />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
