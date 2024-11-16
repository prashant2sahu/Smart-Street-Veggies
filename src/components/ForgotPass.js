import React, { useState } from 'react';
import axios from 'axios';
import '../StyleSheet/forgot.css'
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/forgotPassword', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data.message || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />
                <button type="submit">Send OTP</button>
            </form>
            {message && <p className="success-message">{message } </p> && navigate('/resetPassword')   } 
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ForgotPass;
