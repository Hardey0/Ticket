import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🅃</span> ticz
      </div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><a href="#">Events</a></li>
        <li><a href="#">My Tickets</a></li>
        <li><a href="#">About Project</a></li>
      </ul>

      <button className="ticket-btn">MY TICKETS →</button>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;
