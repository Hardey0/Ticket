import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/upload.css";

const Upload = ({ onBack, onNext }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [request, setRequest] = useState(localStorage.getItem("request") || "");
  const [emailError, setEmailError] = useState("");
  const [uploading, setUploading] = useState(false);

  // ✅ Load only valid Cloudinary image from localStorage
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage && storedImage.startsWith("https://res.cloudinary.com/")) {
      setImageUrl(storedImage);
    } else {
      localStorage.removeItem("uploadedImage");
    }
  }, []);

  // ✅ Upload Image to Cloudinary
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      await uploadToCloudinary(selectedFile);
    }
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hardey"); 
    formData.append("cloud_name", "dcmzfgj1q");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcmzfgj1q/image/upload",
        formData
      );

      const uploadedImageUrl = response.data.secure_url;

      // ✅ Only accept Cloudinary URLs
      if (uploadedImageUrl.startsWith("https://res.cloudinary.com/")) {
        setImageUrl(uploadedImageUrl);
        localStorage.setItem("uploadedImage", uploadedImageUrl);
      } else {
        alert("Invalid image source. Only Cloudinary URLs are allowed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Validate email format
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("email", email);
    setEmailError(email && !validateEmail(email) ? "Invalid email format" : "");
  }, [email]);

  useEffect(() => {
    localStorage.setItem("request", request);
  }, [request]);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Tiez</div>
        <div className="nav-links">
          <a href="#">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets-btn">MY TICKETS →</button>
      </nav>

      <div className="details-box">
        <div className="details-header">
          <h2 className="details-title">Attendee Details</h2>
          <span className="step-text">Step 2/3</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar step-2"></div>
        </div>

    
        <div className="upload-box">
          <p>Upload Profile Photo</p>
          <label className="upload-area">
            <input type="file" onChange={handleFileChange} hidden />
            <div className="upload-content">
              {uploading ? <p>Uploading...</p> : <p>📤 Drag & drop or click to upload</p>}
            </div>
          </label>

          {imageUrl && (
            <div className="uploaded-preview">
              <img src={imageUrl} alt="Uploaded Profile" className="uploaded-image" />
            </div>
          )}
        </div>

      
        <label className="input-label">Enter your name</label>
        <input type="text" className="input-box" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />

       
        <label className="input-label">Enter your email *</label>
        <input type="email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
        {emailError && <p className="error-text">{emailError}</p>}

        <label className="input-label">Special request?</label>
        <textarea className="input-box textarea" value={request} onChange={(e) => setRequest(e.target.value)} placeholder="Enter special request"></textarea>

        <div className="button-group">
          <button className="back-btn" onClick={onBack}>Back</button>
          <button className="next-btn" onClick={onNext} disabled={!email || !!emailError || !imageUrl}>
            Get My Free Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
