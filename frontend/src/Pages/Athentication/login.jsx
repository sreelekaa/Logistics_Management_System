import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Assets/CSS/style.css';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [incorrectErr, setIncorrectErr] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        setEmailErr(email.trim().length === 0);
        setPasswordErr(password.trim().length === 0);

        return !(emailErr || passwordErr);
    };

    const handleLogin = async () => {
        setIncorrectErr(false);
    
        if (!validateForm()) {
            return;
        }
    
        const user = { email, password };
    
        try {
            const response = await axios.post("http://localhost:8081/users/authenticate", user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                const { token } = response.data;
                // Store the token in session storage and set expiration
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('tokenExpiration', Date.now() + 86400000);
                console.log('Login successful:', response.data);
                navigate('/'); // Redirect to home or the desired route
            } else {
                setIncorrectErr(true);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                if (error.response.status === 401) {
                    setIncorrectErr(true);
                } else {
                    alert('An error occurred during login: ' + (error.response.data.message || 'Unknown error'));
                }
            } else {
                console.error('Error:', error);
                alert('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="login-body">
            <div className="login-main">
                <h1>Login</h1>
                {incorrectErr && <small style={{ color: 'red', textAlign: 'center' }}>Invalid email or password</small>}
                <br />
                <p>Email</p>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {emailErr && <small style={{ color: '#d3521d' }}>Please enter your email</small>}
                <br />
                <p>Password</p>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {passwordErr && <small style={{ color: '#d3521d' }}>Please enter your password</small>}
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
                <p style={{ fontSize: '10px' }}>Don't have an account yet? <Link to={'/register'}>Register</Link></p>
                <p style={{ fontSize: '10px' }}>Are you an Admin? <Link to={'/adminlogin'}>Login Here</Link></p>
            </div>
        </div>
    );
}

export default Login;
