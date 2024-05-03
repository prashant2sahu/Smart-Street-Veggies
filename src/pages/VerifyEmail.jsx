import React from 'react';
import OtpInput from 'react-otp-input'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {SignUp} from "../services/operations/authCall";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
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

    return ( <div className='h-[50vh] bg-green-500 rounded-lg  w-[100%]  flex-row justify-center items-center mt24- p-12 ' >
           
            <form onSubmit={submitHandler} >
           <div className=' translate-x-1/2   '>
            <h2>Enter 6 Digit OTP</h2>
           <OtpInput className=" bg-gray-500 gap-0 text-black"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input className='bg-gray-500  text-black' {...props} />}
            />
            <button type='submit' >Verify Email</button>
           </div>
           <div className='flex translate-x-1/2   gap-2 justify-start items-center'  >
            <p>back to login</p>
            <p>Resend it</p>
           </div>
            </form>
    </div> );
}

export default VerifyEmail;