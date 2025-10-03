import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Assets/CSS/footer.css'; 

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');
    const currentTime = Date.now();

    if (token && tokenExpiration && currentTime < tokenExpiration) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to={isLoggedIn ? "/tracking" : "/login"}>Tracking</Link>
            </li>
            <li>
              <Link to={isLoggedIn ? "/inventory" : "/login"}>Inventory</Link>
            </li>
            <li>
              <Link to={isLoggedIn ? "/contact" : "/login"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section contact-info">
          <h3>Contact Information</h3>
          <p>123 Logistics Street</p>
          <p>City, State, ZIP Code</p>
          <p>Email: info@transpomaster.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TranspoMaster Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
