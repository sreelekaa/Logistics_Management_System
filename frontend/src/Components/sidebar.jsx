import React, { useState } from 'react';
import '../Assets/CSS/sidebar.css';
import { BsGearFill } from 'react-icons/bs';

function Sidebar() {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="sidebar">
      <BsGearFill className="icon" />
      <h3>Theme Settings</h3>
      <div className="theme-options">
        <button onClick={() => handleThemeChange('light')}>Light</button>
        <button onClick={() => handleThemeChange('dark')}>Dark</button>
        <button onClick={() => handleThemeChange('green')}>Green</button>
        <button onClick={() => handleThemeChange('blue')}>Blue</button>
      </div>
    </div>
  );
}

export default Sidebar;
