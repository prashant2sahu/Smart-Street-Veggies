import React, { useEffect, useState } from 'react';
import { resetPassword } from '../services/operations/authCall'; // The resetPassword function is now imported here
import image from '../assets/StreetLogin.png'; // Import the image
import { useNavigate } from 'react-router-dom'; // For redirection
import "../StyleSheet/reset.css";
import Footer from './Footer';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
import { Navigate } from 'react-router-dom';
function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


// If access is denied, redirect to ForgotPassword

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword || !confirmPassword) {
      console.log(email ,otp,newPassword, confirmPassword);
      alert("All fields are required.");
      return;
    }

    const result = await resetPassword(email, otp, newPassword, confirmPassword);

    if (result.success) {
      alert("Password reset successfully!");
      localStorage.removeItem('hasVisitedForgot')
      navigate('/');
    } else {
      alert(result.message || "API issue");
    }
  };

  return (<>
    <div className="reset-password">
      <div className="container bg-light otp-container my-5" style={{ maxWidth: '1000px' }}>
        <div className="row rounded overflow-hidden">
          {/* Reset Password Form */}
          <div className="col-md-6 otp-section pt-5 d-flex flex-column justify-content-center align-items-center bg-light" id="ResetPasswordBox">
            <h2 className="fw-bold mb-4 text-center">Reset Your Password</h2>
            <p className="text-muted  text-center w-75">Enter the required information to reset your password.</p>

            <form onSubmit={handleResetSubmit} className="fw-bold w-75 w-md-50 mb-4">
              <div className="form-group mb-2">
                <label htmlFor="email" className="form-label ">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-control"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" id="resetPasswordButton" className="btn reset-button w-md-50 d-flex mb-4">Reset Password</button>
            </form>
            <div className="d-flex justify-content-between w-100 mt-5">
                <span>Privacy Policy</span>
                <span className="text-muted small">2024 © Smart Street Veggies</span>
              </div>
          </div>
          
          {/* Image Section */}
          <div className="col-md-6 d-none d-md-block p-0 position-relative ">
            <img src={image} alt="Fresh Veggies" className="img" style={{ objectFit: 'cover', height: '740px', width: '100%' }} />
            <div className="animate__animated animate__fadeIn card-img-overlay d-flex flex-column justify-content-center align-items-start" style={{ margin: "0 0 -200px 0", paddingLeft: "10px", paddingRight: '10px' }}>
              <h5 className="card-title text-white mt-5 " style={{ fontSize: "4rem", fontWeight: "bold", paddingLeft: "30px" }}>Smart</h5>
              <h6 className="card-title text-white" style={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "30px" }}>Street Veggie</h6>
              <p className="card-text text-white-50 " style={{ paddingLeft: "30px" }}>Yahhh!!! Fresh Veggies</p>
              <p className="card-text mt-4 text-center " style={{ color: "gainsboro", paddingLeft: "40px", paddingRight: "40px", fontSize: "1.1rem" }}>
                Welcome to Smart Street Veggies, your local source for fresh, healthy, and sustainably grown produce! We are committed to bringing farm-fresh vegetables straight to your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="HandleForgotFooter">
<Footer/>
    </div></>
  );
}

export default ResetPassword;

