import React from 'react';
import OtpInput from 'react-otp-input'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {SignUp} from "../services/operations/authCall";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import '../StyleSheet/Otp.css'
import image from '../assets/StreetLogin.png'
// const dotenv=require("dotenv")

const URL=process.env.REACT_APP_BASE_URL;

function VerifyEmail() {
    const dispatch=useDispatch()
    const [otp,setOtp]=useState("");
    const navigate=useNavigate();
    // const call= 
    // const {signupData}= useSelector((state)=>{state.auth})
    const {signupData} = useSelector((state)=>state.auth);


    const submitHandler=async(event)=>{
        console.log(URL);
        event.preventDefault();
    const {email,password,confirmPassword,firstName,lastName,accountType}=signupData;

    console.log("signup done..",accountType, otp );
    // dispatch(SignUp(email,password,confirmPassword,firstName,lastName,accountType,otp,navigate));
    // toast.success("SignUp done.......")
    try{
    const savedUserResponse = await fetch(`${URL}/user/signup`,
    {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password,confirmPassword,firstName,lastName,accountType,otp }),
        
    }
    );
    console.log("every thing is okkk  222");
    
    if (savedUserResponse.ok) {
        console.log("Success: Series info created from front to backend successfully");
        navigate("/login");
      } else {
        console.log("Error: Failed to create series info from front to backend");
      }
  
}catch(error){
    console.log(error);
    console.log("front to back error during series info")
    
}
    }
 

    return (
    

    

<>
<div className='verify-email'>
<div className="container bg-light otp-container my-5">
    <div className="row shadow rounded overflow-hidden">
      
      {/* OTP Section - Visible on All Screens */}
      <div className="col-md-6 otp-section pt-5 d-flex flex-column justify-content-center align-items-center bg-light" id="OTPBOX">
        <h2 className="mb-3 mt-5 fw-bold text-center">Enter 6-Digit OTP</h2>
        <p className="text-muted mb-4 text-center">Please enter the OTP sent to your email.</p>
        
        <form onSubmit={submitHandler} className="w-100 text-center">
          <div className="d-flex justify-content-center gap-2 mt-3 mb-4">
          {/* <OtpInput className=" bg-gray-500 gap-0 text-black"
                        value={otp}
                        onChange={setOtp}
                       numInputs={6}
                     renderSeparator={<span>-</span>}
                        renderInput={(props) => <input className='bg-gray-500  text-black' {...props} />}
                   /> */}
                    <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="">-</span>}
            renderInput={(props) => (
              <input 
                {...props}
                className="form-control text-center otp-input m-1"
                style={{ width: "38px",height:"38px", padding:"0" }}
              />
            )}
          />
           
          </div>
          
          <button type="submit" id="otpbutton"className=" btn btn-primary w-75 w-md-50 mb-4">Proceed</button>
        </form>
        <div className='d-flex  gap-2 justify-content-between h-100 w-75'  >
                <p className='text-primary'><a href="/login">back to login</a></p>
                 <p className='text-danger' onClick={()=>{}}>Resend it</p>
           </div>
        
        <div className="d-flex justify-content-between w-100" id="FooterOTp">
          <span>Privacy Policy</span>
          <span className="text-muted small">2024 © Smart Street Veggies</span>
        </div>
      </div>

      {/* Image Section - Only Visible on Medium and Larger Screens */}
      <div className="col-md-6 d-none d-md-block p-0 position-relative">
        <img src={image} alt="Fresh Veggies" className="img" style={{ objectFit: 'cover' ,height:'740px',width:"450px" }} />
        
      
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start  " style={{margin:"0 0 -200px 0" , paddingLeft:"10px", paddingRight:'10px'}}>
    <h5 className="card-title text-white mt-5 " style={{ fontSize: "4rem", fontWeight: "bold" ,paddingLeft:"30px"}}>Smart</h5>
    <h6 className="card-title text-white" style={{ fontSize: "2rem", fontWeight: "bold" ,paddingLeft:"30px"}}>Street Veggie</h6>
    <p className="card-text text-white-50 " style={{paddingLeft:"30px"}}>Yahhh!!! Fresh Veggies</p>
    <p className="card-text mt-4 text-center" style={{ color: "gainsboro", fontSize: "1.1rem" }}>
      Welcome to Smart Street Veggies, your local source for fresh, healthy, and sustainably grown produce! We are committed to bringing farm-fresh vegetables straight to your neighborhood.
    </p>

    </div>
      </div>
      
    </div>
  </div>
  </div>
</>
);
}

export default VerifyEmail;


// <div className='h-[50vh] bg-green-500 rounded-lg  w-[100%]  flex-row justify-center items-center mt24- p-12 ' >
           
           //         <form onSubmit={submitHandler} >
           //        <div className=' translate-x-1/2   '>
           //         <h2>Enter 6 Digit OTP</h2>
           //        <OtpInput className=" bg-gray-500 gap-0 text-black"
           //             value={otp}
           //             onChange={setOtp}
           //             numInputs={6}
           //             renderSeparator={<span>-</span>}
           //             renderInput={(props) => <input className='bg-gray-500  text-black' {...props} />}
           //         />
           //         <button type='submit' >Verify Email</button>
           //        </div>
           //        <div className='flex translate-x-1/2   gap-2 justify-start items-center'  >
           //         <p>back to login</p>
           //         <p>Resend it</p>
           //        </div>
           //         </form>
           // </div>