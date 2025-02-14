import React, { useState } from "react";
import "./styles/TicketSelection.css";

function TicketSelection({ onNext }) {
  const tickets = [
    { type: "Regular Access", price: "Free", available: "20/52" },
    { type: "VIP Access", price: "$150", available: "20/52" },
    { type: "VVIP Access", price: "$250", available: "20/52" },
  ];

  const [selectedTicket, setSelectedTicket] = useState(
    localStorage.getItem("ticketType") || null
  );
  const [ticketPrice, setTicketPrice] = useState(
    localStorage.getItem("ticketPrice") || ""
  );
  const [ticketCount, setTicketCount] = useState(
    localStorage.getItem("ticketCount") || 1
  );

  const handleTicketSelection = (index) => {
    setSelectedTicket(tickets[index].type);
    setTicketPrice(tickets[index].price);
    localStorage.setItem("ticketType", tickets[index].type);
    localStorage.setItem("ticketPrice", tickets[index].price);
  };

  const handleQuantityChange = (event) => {
    setTicketCount(event.target.value);
    localStorage.setItem("ticketCount", event.target.value);
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">tiez</div>
        <div className="nav-links">
          <a href="#">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets-btn">MY TICKETS →</button>
      </nav>

      {/* Ticket Box */}
      <div className="ticket-box">
        <div className="ticket-header">
          <h2 className="ticket-title">Ticket Selection</h2>
          <span className="step-text">Step 1/3</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>

        <div className="event-box">
          <h1 className="event-title">Techember Fest '25</h1>
          <p className="event-description">
            Join us for an unforgettable experience at <br /> Techember Fest! Secure your spot now.
          </p>
          <p className="event-details">📍 Lagos, Nigeria | 📅 March 15, 2025 | 🕖 7:00 PM</p>
        </div>

        <h3 className="title1">Select Ticket Type:</h3>
        <div className="ticket-options">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className={`ticket-card ${selectedTicket === ticket.type ? "selected" : ""}`}
              onClick={() => handleTicketSelection(index)}
            >
              <p className="ticket-price">{ticket.price}</p>
              <p className="ticket-type">{ticket.type}</p>
              <p className="ticket-availability">{ticket.available}</p>
            </div>
          ))}
        </div>

        <h3>Number of Tickets</h3>
        <select className="ticket-dropdown" value={ticketCount} onChange={handleQuantityChange}>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button className="cancel-btn">Cancel</button>
          <button className="next-btn" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default TicketSelection;
