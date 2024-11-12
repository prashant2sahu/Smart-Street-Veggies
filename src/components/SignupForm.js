import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { setSignupData } from "../Redux/slices/authSlice"
import { SendOtp } from "../services/operations/authCall";
import image from '../assets/StreetLogin.png'
import { FaGoogle, FaApple } from 'react-icons/fa';
import "../StyleSheet/signup.css"

const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "Customer"
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))

    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password != formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // toast.success("Account Created");
        // const accountData = {
        //     ...formData
        // };
        console.log("printing account data ");
        const { email } = formData;
        console.log(email);
        // navigate("/login");
        dispatch(setSignupData(formData))

        dispatch(SendOtp(email, navigate))
        setIsLoggedIn(true);


    }


    return (
        // <div className='signUp'>


        //     <form onSubmit={submitHandler}>
        //     <div className='signupRadioButton'>
        //         <input type='radio'  name='accountType'  id="CartMan" value="CartMan" onChange={changeHandler}/>
        //         <label htmlFor='CartMan' value="CartMan">CartMan</label>

        //         <input type='radio' name='accountType' defaultChecked={true}  id="Customer" value="Customer" onChange={changeHandler}/>
        //         <label htmlFor='Customer' value="Customer">Customer</label>
        //     </div>

        //     {/* first name and lastName */}
        //         <div className='signupRadioButton2'>
        //                 <label>
        //                     <p>First Name<sup>*</sup></p>
        //                     <input
        //                         required
        //                         type="text"
        //                         name="firstName"
        //                         onChange={changeHandler}
        //                         placeholder="Enter First Name"
        //                         value={formData.firstName}
        //                     />
        //                 </label>

        //                 <label>
        //                     <p>Last Name<sup>*</sup></p>
        //                     <input
        //                         required
        //                         type="text"
        //                         name="lastName"
        //                         onChange={changeHandler}
        //                         placeholder="Enter Last Name"
        //                         value={formData.lastName}
        //                     />
        //                 </label>
        //         </div>

        //         {/* email Add */}
        //         <div className='signupRadioButton3'>
        //             <label>
        //                 <p>Email Address<sup>*</sup></p>
        //                 <input
        //                     required
        //                     type="email"
        //                     name="email"
        //                     onChange={changeHandler}
        //                     placeholder="Enter Email Address "
        //                     value={formData.email}
        //                 />
        //             </label>
        //         </div>


        //         {/* createPassword and Confirm Password */}
        //         <div className='signupRadioButton4'>
        //             <label>
        //                 <p>Create Password<sup>*</sup></p>
        //                 <input
        //                     required
        //                     type= {showPassword ? ("text") : ("password")}
        //                     name="password"
        //                     onChange={changeHandler}
        //                     placeholder="Enter Password"
        //                     value={formData.password}
        //                 />
        //                 <span onClick={() => setShowPassword((prev) => !prev)}>
        //                     {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
        //                 </span>
        //             </label>

        //             <label>
        //                 <p>Confirm Password<sup>*</sup></p>
        //                 <input
        //                     required
        //                     type= {showPassword ? ("text") : ("password")}
        //                     name="confirmPassword"
        //                     onChange={changeHandler}
        //                     placeholder="Confirm Password"
        //                     value={formData.confirmPassword}
        //                 />
        //                 <span onClick={() => setShowPassword((prev) => !prev)}>
        //                     {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
        //                 </span>
        //             </label>
        //         </div>
        //     <button>
        //         Create Account
        //     </button>
        //     </form>

        // </div>
        <>
      
            <div className="container d-flex align-items-md-start signupheight">
                <div className="row " style={{ marginTop: "50px" }}>
                    {/* Left side image with overlay text */}
                    <div className="col-md-4 d-none d-md-block position-relative" style={{ marginLeft: "100px" }}>
    <img
        src={image}
        alt="Login Visual"
        className="imgShadow"
        style={{ height: "760px" , objectFit: 'cover' }}
    />
     <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start position-relative" style={{marginTop:"-450px",marginLeft:"20px"}}>
    <h5 className="card-title text-white mt-5 " style={{ fontSize: "4rem", fontWeight: "bold" ,paddingLeft:"30px"}}>Smart</h5>
    <h6 className="card-title text-white" style={{ fontSize: "2rem", fontWeight: "bold" ,paddingLeft:"30px"}}>Street Veggie</h6>
    <p className="card-text text-white-50 " style={{paddingLeft:"30px"}}>Yahhh!!! Fresh Veggies</p>
    <p className="card-text mt-2 text-center" style={{ color: "gainsboro", fontSize: "1.2rem" }}>
      Welcome to Smart Street Veggies, your local source for fresh, healthy, and sustainably grown produce! We are committed to bringing farm-fresh vegetables straight to your neighborhood.
    </p>

    </div>
</div>


                    {/* Right side sign-up form */}
                    <div className="col-lg-6 pl-3 pt-4  d-flex justify-content-center FormShadow1">
                        <form className="w-75" onSubmit={submitHandler}>
                            <h2 className="text-center mb-4">Sign up for an account</h2>

                            {/* Social media login buttons */}
                            <div id="handleBtn" className="d-flex justify-content-center mb-4 gap-2">
                                <button type="button"  id="signBtn" style={{fontSize:"15px"}}className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
                                    <FaGoogle className="me-1" /> Continue with Google
                                </button>
                                <button type="button"  id="signBtn"  style={{fontSize:"15px"}} className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
                                    <FaApple className="me-1" /> Continue with Apple
                                </button>
                            </div>

                            {/* Account type */}
                            <div className='mb-3'>
                                <label className="form-label fw-bold">Account Type</label>
                                <div className='d-flex'>
                                    <div className="form-check me-4">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="accountType"
                                            id="CartMan"
                                            value="CartMan"
                                            checked={formData.accountType === 'CartMan'}
                                            onChange={changeHandler}
                                        />
                                        <label className="form-check-label" htmlFor="CartMan">
                                            Greengrocer
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="accountType"
                                            id="Customer"
                                            value="Customer"
                                            checked={formData.accountType === 'Customer'}
                                            onChange={changeHandler}
                                        />
                                        <label className="form-check-label" htmlFor="Customer">
                                            Customer
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* User details */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label fw-bold">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={changeHandler}
                                        placeholder="Enter First Name"
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label fw-bold">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={changeHandler}
                                        placeholder="Enter Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <label className="form-label fw-bold">Email Address</label>
                            <div className="mb-3 input-group">

                                <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label fw-bold">Create Password</label>
                                    <div className="input-group">
                                    <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={changeHandler}
                                            placeholder="Enter Password"
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </span>
                                    </div>
                                </div>
                                </div>
                                <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label fw-bold">Confirm Password</label>
                                    <div className="input-group">
                                    <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={changeHandler}
                                            placeholder="Confirm Password"
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </span>
                                    </div>
                                    </div>
                                </div>
                            

                            {/* <button type="submit" className="btn btn-primary w-100 mb-3">
                                Create Account
                            </button> */}

<button type="submit" className="signupbtn">
    <span className="signupbtn-text-one">Create Account</span>
    <span className="signupbtn-text-two">Thanku!</span>
</button>
                            {/* Footer Privacy info */}
                            <p className="text-center d-flex " id="footerHead" ><span>Privacy</span><span>  @2024 SmartStreetVeggie</span></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignupForm