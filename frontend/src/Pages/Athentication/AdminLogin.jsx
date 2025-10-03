import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Assets/CSS/style.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [adminMail, setAdminMail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminMailErr, setAdminMailErr] = useState(false);
    const [adminPasswordErr, setAdminPasswordErr] = useState(false);
    const [incorrectErr, setIncorrectErr] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Hardcoded admin credentials
    const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'admin123'
    };

    const validateForm = () => {
        setAdminMailErr(adminMail.trim().length === 0);
        setAdminPasswordErr(adminPassword.trim().length === 0);

        return !(adminMailErr || adminPasswordErr);
    };

    const handleLogin = () => {
        setIncorrectErr(false);

        if (!validateForm()) {
            return;
        }

        // Check credentials
        if (adminMail === adminCredentials.email && adminPassword === adminCredentials.password) {
            // Simulate token storage
            sessionStorage.setItem('token', 'dummyToken');
            sessionStorage.setItem('tokenExpiration', Date.now() + 86400000); // Token expiration in 1 day
            console.log('Login successful');
            navigate('/admin-dashboard'); // Redirect to the admin dashboard
        } else {
            setIncorrectErr(true);
        }
    };

    return (
        <div className="login-body">
            <div className="login-main">
                <h1>Admin Login</h1>
                {incorrectErr && <small style={{ color: 'red', textAlign: 'center' }}>Invalid Admin Credentials</small>}
                <br />
                <p>Admin Email</p>
                <input 
                    type='email' 
                    value={adminMail} 
                    onChange={(e) => setAdminMail(e.target.value)} 
                />
                {adminMailErr && <small style={{ color: '#d3521d' }}>Please enter the Admin Email</small>}
                <br />
                <p>Password</p>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={adminPassword} 
                    onChange={(e) => setAdminPassword(e.target.value)} 
                />
                {adminPasswordErr && <small style={{ color: '#d3521d' }}>Please enter the Password</small>}
                <br />
                <label className="checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)} 
                    />
                    <span className="checkmark"></span>
                    Show Password
                </label>
                <br />
                <button onClick={handleLogin}>Login</button>
                <p style={{ fontSize: '10px' }}>Not an admin? <Link to={'/login'}>User Login</Link></p>
            </div>
        </div>
    );
}

export default AdminLogin;
