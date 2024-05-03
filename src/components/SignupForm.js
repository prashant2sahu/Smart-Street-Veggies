import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {setSignupData} from "../Redux/slices/authSlice"
import {SendOtp}  from "../services/operations/authCall";
const SignupForm = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:"Customer"
    })

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    function submitHandler(event) {
        event.preventDefault();
        if(formData.password != formData.confirmPassword) {
            toast.error("Passwords do not match");
            return ;
        }

        // toast.success("Account Created");
        // const accountData = {
            //     ...formData
            // };
            console.log("printing account data ");
            const {email} =formData;
            console.log(email);
            // navigate("/login");
            dispatch(setSignupData(formData))
            
            dispatch(SendOtp(email, navigate))
            setIsLoggedIn(true);


    }


  return (
    <div className='signUp'>
        {/* student-Instructor tab */}
        {/* <div> */}
            {/* <button>
                Customer
            </button>
            <button>
                Sells Partner
            </button> */}

        {/* <input type='radio' id='CartMan' value="">

        </input>

        </div>   */}


        <form onSubmit={submitHandler}>
        <div className='signupRadioButton'>
            <input type='radio'  name='accountType'  id="CartMan" value="CartMan" onChange={changeHandler}/>
            <label htmlFor='CartMan' value="CartMan">CartMan</label>

            <input type='radio' name='accountType' defaultChecked={true}  id="Customer" value="Customer" onChange={changeHandler}/>
            <label htmlFor='Customer' value="Customer">Customer</label>
        </div>

        {/* first name and lastName */}
            <div className='signupRadioButton2'>
                    <label>
                        <p>First Name<sup>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                        />
                    </label>

                    <label>
                        <p>Last Name<sup>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                        />
                    </label>
            </div>

            {/* email Add */}
            <div className='signupRadioButton3'>
                <label>
                    <p>Email Address<sup>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                    />
                </label>
            </div>
        

            {/* createPassword and Confirm Password */}
            <div className='signupRadioButton4'>
                <label>
                    <p>Create Password<sup>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>

                <label>
                    <p>Confirm Password<sup>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>
            </div>
        <button>
            Create Account
        </button>
        </form>

    </div>
  )
}

export default SignupForm
