// import React, { useState } from 'react';
// import '../../Assets/CSS/settings.css';

// const Settings = () => {
//   const [profile, setProfile] = useState({
//     username: 'john_doe',
//     email: 'john@example.com',
//     phone: '123-456-7890',
//   });

//   const [password, setPassword] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [preferences, setPreferences] = useState({
//     theme: 'light',
//     notifications: true,
//   });

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPassword((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePreferencesChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPreferences((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleProfileSubmit = (e) => {
//     e.preventDefault();
//     // Handle profile update logic here
//     console.log('Profile updated:', profile);
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     // Handle password update logic here
//     console.log('Password updated:', password);
//   };

//   const handlePreferencesSubmit = (e) => {
//     e.preventDefault();
//     // Handle preferences update logic here
//     console.log('Preferences updated:', preferences);
//   };

//   return (
//     <div className="settings">
//       <h3>Settings</h3>
//       <div className="settings-section">
//         <h4>Profile Information</h4>
//         <form onSubmit={handleProfileSubmit}>
//           <label>
//             Username:
//             <input
//               type="text"
//               name="username"
//               value={profile.username}
//               onChange={handleProfileChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={profile.email}
//               onChange={handleProfileChange}
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="tel"
//               name="phone"
//               value={profile.phone}
//               onChange={handleProfileChange}
//             />
//           </label>
//           <button type="submit" className="btn save-btn">
//             Save
//           </button>
//         </form>
//       </div>

//       <div className="settings-section">
//         <h4>Change Password</h4>
//         <form onSubmit={handlePasswordSubmit}>
//           <label>
//             Current Password:
//             <input
//               type="password"
//               name="currentPassword"
//               value={password.currentPassword}
//               onChange={handlePasswordChange}
//             />
//           </label>
//           <label>
//             New Password:
//             <input
//               type="password"
//               name="newPassword"
//               value={password.newPassword}
//               onChange={handlePasswordChange}
//             />
//           </label>
//           <label>
//             Confirm New Password:
//             <input
//               type="password"
//               name="confirmPassword"
//               value={password.confirmPassword}
//               onChange={handlePasswordChange}
//             />
//           </label>
//           <button type="submit" className="btn save-btn">
//             Save
//           </button>
//         </form>
//       </div>

//       <div className="settings-section">
//         <h4>Preferences</h4>
//         <form onSubmit={handlePreferencesSubmit}>
//           <label>
//             Theme:
//             <select
//               name="theme"
//               value={preferences.theme}
//               onChange={handlePreferencesChange}
//             >
//               <option value="light">Light</option>
//               <option value="dark">Dark</option>
//             </select>
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="notifications"
//               checked={preferences.notifications}
//               onChange={handlePreferencesChange}
//             />
//             Enable Notifications
//           </label>
//           <button type="submit" className="btn save-btn">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Settings;
// src/pages/Settings.js
import React from 'react';

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      <p>This is the settings page.</p>
    </div>
  );
}

export default Settings;
