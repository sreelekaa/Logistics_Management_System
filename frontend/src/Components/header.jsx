// import React from 'react';
// import '../Assets/CSS/header.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';

// function Header({ toggleSidebar }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-content">
//         <button className="btn toggle-btn" onClick={toggleSidebar}>
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//         <div className="right-buttons">
//           <button className="btn">
//             <FontAwesomeIcon icon={faBell} />
//           </button>
//           <button className="btn">
//             <FontAwesomeIcon icon={faUserCircle} />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;

import React, { useState } from 'react';
import {
  BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsBellSlashFill
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleAvatarClick = () => {
    navigate('/accounts');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <div className='search-bar'>
          <BsSearch className='icon' />
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search...'
          />
        </div>
      </div>
      <div className='header-right'>
        {notificationsEnabled ? (
          <BsFillBellFill className='icon' onClick={toggleNotifications} />
        ) : (
          <BsBellSlashFill className='icon' onClick={toggleNotifications} />
        )}
        {/* <BsFillEnvelopeFill className='icon' /> */}
        <BsPersonCircle className='icon' onClick={handleAvatarClick} />
      </div>
    </header>
  );
}

export default Header;
