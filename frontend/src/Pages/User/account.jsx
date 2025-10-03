import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaUserAstronaut, FaUserNinja, FaUserSecret, FaEye, FaEyeSlash, FaSave, FaLock } from 'react-icons/fa';
import '../../Assets/CSS/account.css';
import Navbar from '../../Components/navbar';

const avatars = [
  { icon: <FaUserCircle size={50} />, name: 'Default' },
  { icon: <FaUserAstronaut size={50} />, name: 'Astronaut' },
  { icon: <FaUserNinja size={50} />, name: 'Ninja' },
  { icon: <FaUserSecret size={50} />, name: 'Secret' },
];

const AccountPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
    const avatarName = storedUser.avatar || 'Default';
    setSelectedAvatar(avatars.find(avatar => avatar.name === avatarName));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    setUser((prevUser) => ({
      ...prevUser,
      avatar: avatar.name,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Account information saved successfully!');
  };

  return (
    <div className='account'>
      <Navbar />
      <div className="account-container">
        <div className="account-header">
          <h1>Account</h1>
        </div>
        <div className="account-details">
          <h2><FaUserCircle /> User Information</h2>
          <div className="account-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="account-details">
          <h2><FaLock /> Change Password</h2>
          <div className="account-form">
            <label>
              Password:
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
                <button onClick={togglePasswordVisibility} className="password-toggle-button">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
          </div>
        </div>
        <div className="avatar-section">
          <h2><FaUserCircle /> Avatar</h2>
          <div className="selected-avatar">{selectedAvatar.icon}</div>
          <div className="avatar-selection">
            {avatars.map((avatar) => (
              <button key={avatar.name} className="avatar-button" onClick={() => handleAvatarChange(avatar)}>
                {avatar.icon}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleSave} className="save-button">
          <FaSave /> Save Account Information
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
