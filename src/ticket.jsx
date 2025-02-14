import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import bwipjs from "bwip-js";
import html2canvas from "html2canvas";
import "./styles/ticket.css";

const Ticket = ({ onBack }) => {
  const [barcode, setBarcode] = useState("");
  const [uploadedImage, setUploadedImage] = useState(localStorage.getItem("uploadedImage") || "");
  const ticketRef = useRef();

  // Retrieve stored details
  const name = localStorage.getItem("name") || "Guest";
  const email = localStorage.getItem("email") || "Guest";
  const request = localStorage.getItem("request") || "None";
  const ticketType = localStorage.getItem("ticketType") || "General";
  const ticketCount = localStorage.getItem("ticketCount") || "1";

  // Generate a barcode on component mount
  useEffect(() => {
    const randomBarcode = Math.floor(100000000 + Math.random() * 900000000).toString();
    setBarcode(randomBarcode);

    setTimeout(() => {
      const canvas = document.getElementById("barcodeCanvas");
      if (canvas) {
        bwipjs.toCanvas(canvas, {
          bcid: "code128",
          text: randomBarcode,
          scale: 3,
          height: 10,
        });
      }
    }, 500);
  }, []);

  // ✅ Download ticket as PDF
  const downloadPDF = () => {
    const ticketElement = ticketRef.current;

    html2canvas(ticketElement, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.text("Your Ticket", 80, 10);
      pdf.addImage(imgData, "PNG", 15, 20, 180, 160);
      pdf.save("ticket.pdf");
    });
  };

  return (
    <div className="ticket-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Ticz</div>
        <div className="nav-links">
          <a href="#">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets-btn">MY TICKETS →</button>
      </nav>

      {/* Ticket Section */}
      <div className="ticket-box" ref={ticketRef}>
        <h2>Your Ticket is Booked!</h2>
        <p>Check your email for a copy or <b>download</b> it now.</p>

        {/* Ticket Card */}
        <div className="ticket-card">
          <h3>Techember Fest '25</h3>
          <p>📍 Event Location, March 15, 2025 | 7:00 PM</p>

          {/* ✅ Cloudinary Profile Image */}
          {uploadedImage && (
            <div className="profile-image-container">
              <img
                src={uploadedImage}
                alt="Profile"
                className="profile-image"
                crossOrigin="anonymous" // ✅ Prevent CORS issues
              />
            </div>
          )}

          {/* User Details */}
          <div className="user-details">
            <p><b>Name:</b> {name}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Ticket Type:</b> {ticketType}</p>
            <p><b>Ticket for:</b> {ticketCount}</p>
            <p><b>Special Request:</b> {request}</p>
          </div>

          {/* Barcode */}
          <canvas id="barcodeCanvas"></canvas>
          <p className="barcode-number">{barcode}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="back-btn" onClick={onBack}>Book Another Ticket</button>
        <button className="download-btn" onClick={downloadPDF}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
