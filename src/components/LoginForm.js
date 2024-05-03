import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../services/operations/authCall';
import {useDispatch} from "react-redux"
const LoginForm = ({setIsLoggedIn}) => {
    const URL=process.env.REACT_APP_BASE_URL;

    const token=localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    async function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        const {email, password}=formData;
        dispatch(login(email,password,navigate));
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
    <form className='loginFormOne' onSubmit={submitHandler}>
        <label className='loginFormTwo'>
            <p className='loginPara1'>
                Email Address<sup>*</sup>
            </p>
            <input className='loginInput1'
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email id"
                name="email"
            />
        </label>

        <label>
            <p className='loginPara2'>
                Password<sup>*</sup>
            </p>
            <input className='loginInput2'
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
            />

            <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
            </span>

            <Link to="#">
                <p className='loginPara3'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button>
            Sign In
        </button>

    </form>
    // </div>
  )
}

export default LoginForm
