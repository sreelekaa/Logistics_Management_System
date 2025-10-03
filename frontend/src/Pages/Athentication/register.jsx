import React, { useState } from "react";
import axios from "axios";
import '../../Assets/CSS/style.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || phone.trim().length === 0) {
            return 'All fields are required.';
        } 
        if (!email.includes('@') || !email.includes('.') || !email.includes('com')) {
            return 'Please enter a valid email address.';
        } 
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        if (phone.length !== 10) {
            return 'Phone number must be 10 digits.';
        }
        return '';
    }

    const handleFormSubmit = async () => {
        setError('');
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const user = { name, email, password, phone };

        try {
            const response = await axios.post("http://localhost:8081/users/add", user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("API response:", response.data);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.message || 'Invalid input data.');
                } else if (error.response.status === 403) {
                    setError('Forbidden (403).');
                } else if (error.response.status === 409) {
                    setError('Username or email already taken.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } else {
                setError('Network error. Please try again later.');
            }
        }
    }

    return (
        <div className="register-body">
            <div className="register-main">
                <h1>Register</h1>
                {error && <p className="errP">{error}</p>}
                <br />
                <p>Name</p>
                <input 
                    type='text' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <br />
                <p>Phone</p>
                <input 
                    type='text' 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
                <br />
                <p>Email</p>
                <input 
                    type='text' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <br />
                <p>Password</p>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br />
                <p>Confirm Password</p>
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
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
                <button onClick={handleFormSubmit}>Register</button>
            </div>
        </div>
    );
}

export default Register;
