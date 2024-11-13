import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../services/operations/authCall';
import { useDispatch } from "react-redux"
import image from '../assets/StreetLogin.png'
import '../StyleSheet/LoginForm.css'
import Footer from './Footer';

const LoginForm = ({ setIsLoggedIn }) => {
    const URL = process.env.REACT_APP_BASE_URL;

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "", password: ""
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

    async function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        const { email, password } = formData;
        const res=dispatch(login(email, password, navigate));
     
      

        // try{
        //     const savedUserResponse = await fetch(`${URL}/user/login`,
        //     {
        //         method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({email,password}),

        //     }
        //     );
        //     console.log("every thing is okkk  222");

        //     if (savedUserResponse.ok) {
        //         console.log("Success: Series info created from front to backend successfully",savedUserResponse);
        //         navigate("/dashboard");
        //       } else {
        //         console.log("Error: Failed to create series info from front to backend");
        //       }

        // }catch(error){
        //     console.log(error);
        //     console.log("front to back error during series info")

        // }
        // toast.success("Logged In");
        // navigate("/dashboard");
    }

    return (
        // <div className='loginFormMain'>
        // <form className='loginFormOne' onSubmit={submitHandler}>
        //     <label className='loginFormTwo'>
        //         <p className='loginPara1'>
        //             Email Address<sup>*</sup>
        //         </p>
        //         <input className='loginInput1'
        //             required
        //             type="email"
        //             value = {formData.email}
        //             onChange={changeHandler}
        //             placeholder="Enter email id"
        //             name="email"
        //         />
        //     </label>

        //     <label>
        //         <p className='loginPara2'>
        //             Password<sup>*</sup>
        //         </p>
        //         <input className='loginInput2'
        //             required
        //             type= {showPassword ? ("text") : ("password")}
        //             value = {formData.password}
        //             onChange={changeHandler}
        //             placeholder="Enter Password"
        //             name="password"
        //         />

        //         <span onClick={() => setShowPassword((prev) => !prev)}>
        //             {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
        //         </span>

        //         <Link to="#">
        //             <p className='loginPara3'>
        //                 Forgot Password
        //             </p>
        //         </Link>
        //     </label>

        //     <button>
        //         Sign In
        //     </button>

        // </form>
        // </div>
        <>

<div className="container-fluid d-flex justify-content-center md-5 align-items-start" id="manageHeight">
<div className="container bg-light otp-container my-5" style={{ maxWidth: '1000px' }}>
        <div className="row  overflow-hidden" id="manageComponenet"  >
            {/* Left side - Login Form */}
            <div className="col-md-6  d-flex  manageComponenet  ">
                <div className="login-form-container  text-center mt-4"> {/* Added margin top */}
                    <h2>Sign In</h2>
                    <p className="text-muted">Send, spend and save smarter</p>

                    {/* Social login buttons */}
                    <div className="mb-4 d-flex justify-content-between gap-2">
                        <button className="btn btn-outline-secondary w-48 textMaintain" >
                            <i className="fab fa-google"></i> Sign In with Google
                        </button>
                        <button className="btn btn-outline-secondary w-48 textMaintain">
                            <i className="fab fa-apple"></i> Sign In with Apple
                        </button>
                    </div>

                    <p className="text-muted">or with e-mail</p>

                    <form className="w-100" onSubmit={submitHandler}>
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={changeHandler}
                                    name="email"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={changeHandler}
                                    name="password"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label "style={{fontSize:"13px"}}>Remember me</label>
                                </div>
                            <div className="form-check">
                            <Link to="/forgot" className=""  style={{textDecoration:"none",color:"red",fontSize:"13px"  }}>Forgot Password?</Link>
                       </div>  </div>

                        <button className="btn signinTheme w-100 mt-3">Sign In</button>
                    </form>

                    <p className="mt-4">Don't have an account? <Link to="/signup" style={{textDecoration:"none",color:"green"}}>Sign Up</Link></p>
                   
<br/>
<br/>
<br/>

                    {/* Footer - Privacy Policy and Copyright */}
                    <div className="text-center" id="FooterHead" >
                        <p className="d-flex justify-content-between w-100" >
                            <span>Privacy Policy</span>
                            <span>© 2024 Smart Street Veggie</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Image and Text */}
            <div className="col-md-6 d-none d-md-block position-relative">
                <img
                    src={image || 'https://via.placeholder.com/500x500'}
                    alt="Login Visual"
                    className="img"
                    style={{ height: '760px',width:"550px", objectFit: 'cover' }}
                />
                
                <div className="col-md-6 overlay-text position-absolute top-50 start-50 translate-middle text-white text-center d-flex flex-column gap-1">
                    <div className='innerSubheading'>
                        <div className='animate__animated animate__slideInRight' style={{
                            marginTop: "310px",
                            position: "relative",
                            fontSize: "4.5rem",
                            fontWeight: "bold",
                            color: "white", marginLeft: "-50%"
                        }}>Smart</div>
                        <div style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "white",
                            marginLeft: "-50%",
                            marginTop: "-20px"
                        }} className='subHeading animate__animated animate__slideInRight'
                        >Street veggie</div>
                        <p className="subHeading animate__animated animate__slideInRight" style={{
                            color: 'gainsboro', marginLeft: "-50%"
                        }}>Yahhh!!! Fresh Veggies</p>
                        <p className=" animate__animated animate__slideInRight" style={{
                            fontSize: "1.2rem",
                            textOverflow: "wrap",
                            color: "white",
                            width: "500px",
                            textAlign: "center",
                            paddingLeft: "70px",
                            paddingRight: "40px",
                            marginLeft: "-150px"
                        }}>
                            Welcome to Smart Street Veggies, your local source for fresh, healthy, and sustainably grown produce! We are committed to bringing farm-fresh vegetables straight to your neighborhood.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</div>
  <Footer/>

        </>
    )
}

export default LoginForm
