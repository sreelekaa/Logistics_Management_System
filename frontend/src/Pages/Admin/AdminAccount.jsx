import React from 'react';
import '../../Assets/CSS/AdminAccount.css';

function AdminAccount() {
  return (
    <div className="admin-account">
      <h1>Admin Account</h1>
      
      <section className="profile-info">
        <h2>Profile Information</h2>
        <div className="info-item">
          <label>Name:</label>
          <span>Admin Name</span>
        </div>
        <div className="info-item">
          <label>Email:</label>
          <span>admin@example.com</span>
        </div>
        <div className="info-item">
          <label>Role:</label>
          <span>Administrator</span>
        </div>
        <button className="btn-edit">Edit Profile</button>
      </section>

      <section className="account-settings">
        <h2>Account Settings</h2>
        <div className="setting-item">
          <label>Password:</label>
          <span>**********</span>
          <button className="btn-change-password">Change Password</button>
        </div>
        <div className="setting-item">
          <label>Two-Factor Authentication:</label>
          <span>Enabled</span>
          <button className="btn-toggle-2fa">Disable 2FA</button>
        </div>
      </section>

      <section className="management-options">
        <h2>Management Options</h2>
        <div className="option-item">
          <label>Manage Users</label>
          <span>Access user management tools and permissions.</span>
          <button className="btn-manage-users">Manage Users</button>
        </div>
        <div className="option-item">
          <label>Manage Content</label>
          <span>Oversee and manage site content and resources.</span>
          <button className="btn-manage-content">Manage Content</button>
        </div>
      </section>
    </div>
  );
}

export default AdminAccount;
