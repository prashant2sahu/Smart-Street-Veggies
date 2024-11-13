// import React, { useState } from 'react';
// import { ForgotPassword ,ReSendOtp} from '../services/operations/authCall';
// import image from '../assets/StreetLogin.png';
// import { useNavigate } from 'react-router-dom';
// import "../StyleSheet/forgot.css";

// import { useDispatch } from 'react-redux';
// function ForgotPasswordPage() {
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const [email, setEmail] = useState('');

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Enter an email address");
//       return;
//     }

//     try {
//       // Call the ForgotPassword function and await the result
//       const result = await ForgotPassword(email);

//       console.log(result); // Check if the result is returned correctly
//       alert(result.message); // Display message from the response
//       navigate("/resetPassword"); // Navigate on success
//     } catch (error) {
//       console.error('Error during password reset request:', error);
//       alert(error.message); // Show error message
//     }
//   };
//   const reSendOtp=async(email)=>{
   
//    try{
//      const result=await dispatch(ReSendOtp(email,navigate));
//     alert ("Resend OTp Successfully")
//     navigate("/resetPassword");
//     console.log(result);
//    }
//    catch(e){
//     alert("Not Send sorry ")
//    }
//   }

//   return (
//     <>
//       <div className="forgot-password">
//         <div className="container bg-light otp-container my-5" style={{ maxWidth: '1000px' }}>
//           <div className="row rounded overflow-hidden">
//             <div className="col-md-6 otp-section pt-5 d-flex flex-column justify-content-center align-items-center bg-light" id="ForgotPasswordBox">
//               <h2 className="mb-3 fw-bold text-center">Forgot Your Password?</h2>
//               <p className="text-muted mb-4 text-center p-4">Enter the email associated with your account to reset your password.</p>

//               <form onSubmit={submitHandler} className="w-75 w-md-50 mb-4 ">
//                 <div className="form-group mb-4">
//                   <label htmlFor="email" className="form-label fw-bold">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <button type="submit" id="resetPasswordButton" className="btn  w-100 reset-button w-md-50 mb-4">
//                   Send OTP
//                 </button>
//               </form>

//               <div className="d-flex gap-2 justify-content-between w-75">
//                 <p ><a href="/login"id="upperFooter">Back to login</a></p>
//                 <p className="text-danger design"   onClick={() => {reSendOtp(email)}} style={{cursor:"pointer"}}><u>Resend Email</u></p>
//               </div>

//               <div className="d-flex bg-light justify-content-between w-100" id="FooterForgotPassword">
//                 <span>Privacy Policy</span>
//                 <span className="text-muted small">2024 © Smart Street Veggies</span>
//               </div>
//             </div>

            // <div className="col-md-6 d-none d-md-block p-0 position-relative">
            //   <img src={image} alt="Fresh Veggies" className="img" style={{ objectFit: 'cover', height: '740px', width: '100%' }} />
            //   <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start" style={{ margin: "0 0 -200px 0", paddingLeft: "10px", paddingRight: '10px' }}>
            //     <h5 className="card-title text-white mt-5 " style={{ fontSize: "4rem", fontWeight: "bold", paddingLeft: "30px" }}>Smart</h5>
            //     <h6 className="card-title text-white" style={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "30px" }}>Street Veggie</h6>
            //     <p className="card-text text-white-50 " style={{ paddingLeft: "30px" }}>Yahhh!!! Fresh Veggies</p>
            //     <p className="card-text mt-4 text-center " style={{ color: "gainsboro", paddingLeft: "40px", paddingRight: "40px", fontSize: "1.1rem" }}>
            //       Welcome to Smart Street Veggies, your local source for fresh, healthy, and sustainably grown produce! We are committed to bringing farm-fresh vegetables straight to your neighborhood.
            //     </p>
            //   </div>
            // </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ForgotPasswordPage;
import React, { useState, useEffect } from 'react';
import { ForgotPassword, ReSendOtp } from '../services/operations/authCall';
import { useNavigate } from 'react-router-dom';
import "../StyleSheet/forgot.css";
import { useDispatch } from 'react-redux';
import image from '../assets/StreetLogin.png';
import Footer from './Footer';
  import { getFromLocalStorage, saveToLocalStorage } from '../services/operations/SecureLocal';
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Timer for 30 seconds

  
  useEffect(() => {
localStorage.removeItem('hasVisitedForgot')
    let timer;
    if (isOtpSent && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, resendTimer]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Enter an email address");
      return;
    }

    try {
      const result = await ForgotPassword(email);
      alert(result.message);
      setIsOtpSent(true);
      setResendTimer(30); // Reset the timer for resend OTP
      saveToLocalStorage('hasVisitedForgot', true);
      navigate("/resetPassword");
    } catch (error) {
      console.error('Error during password reset request:', error);
      alert(error.message);
    }
  };

  const reSendOtp = async () => {
    try {
      const result = await dispatch(ReSendOtp(email, navigate));
      alert("Resend OTP successfully");
      setResendTimer(30); // Reset timer after resend
    } catch (e) {
      alert("Unable to send OTP, please try again later");
    }
  };

  return (
    <>
      <div className="forgot-password">
        <div className="container bg-light otp-container my-5" style={{ maxWidth: '1000px' }}>
          <div className="row rounded overflow-hidden">
            <div className="col-md-6 otp-section pt-5 d-flex flex-column justify-content-center align-items-center bg-light" id="ForgotPasswordBox">
              <h2 className="mb-3 fw-bold text-center">Forgot Your Password?</h2>
              <p className="text-muted mb-4 text-center p-4">Enter the email associated with your account to reset your password.</p>

              <form onSubmit={submitHandler} className="w-75 w-md-50 mb-4 ">
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label fw-bold">Email Address</label>
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

                <button type="submit" disabled={isOtpSent} className="btn  w-100 reset-button w-md-50 mb-4">
                  {isOtpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
              </form>

              <div className="d-flex gap-2 justify-content-between w-75">
                <p><a href="/login" id="upperFooter">Back to login</a></p>
                <p
                  className="text-danger design"
                  onClick={resendTimer === 0 ? reSendOtp : null}
                  style={{ cursor: resendTimer === 0 ? "pointer" : "not-allowed" }}
                >
                  <u>Resend Email {resendTimer > 0 && `(${resendTimer}s)`}</u>
                </p>
              </div>

              <div className="d-flex bg-light justify-content-between w-100" id="FooterForgotPassword">
                <span>Privacy Policy</span>
                <span className="text-muted small">2024 © Smart Street Veggies</span>
              </div>
            </div>

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
      <div className='HandleForgotFooter'>
 <Footer />
      </div>
     
    </>
  );
}

export default ForgotPasswordPage;
