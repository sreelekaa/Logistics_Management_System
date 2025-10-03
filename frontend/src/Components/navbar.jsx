import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Assets/CSS/navbar.css';
import logo from '../Assets/Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <Link to="/">TranspoMaster</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li>
          <Link to={isLoggedIn ? "/tracking" : "/login"}>Tracking</Link>
        </li>
        <li>
          <Link to={isLoggedIn ? "/inventory" : "/login"}>Inventory</Link>
        </li>
        <li>
          <Link to={isLoggedIn ? "/shipments" : "/login"}>Shipments</Link>
        </li>
        <li>
          <Link to={isLoggedIn ? "/contact" : "/login"}>Contact</Link>
        </li>
      </ul>
      <div className="auth-links">
        {isLoggedIn ? (
          <div className="profile-icon" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/account">Account</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
