// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">MAISON QUINDECIM</div>

      <div className="nav-links">
        <Link to="/">Gallery</Link>
        <Link to="/letters">Letters</Link>
      </div>
    </nav>
  );
}
