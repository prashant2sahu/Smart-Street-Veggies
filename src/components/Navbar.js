import React, { useState } from 'react'
import logo from "../assets/horizon logo.png"
import {Link, Navigate, useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import {useSelector,useDispatch} from "react-redux"
import { logout } from '../services/operations/authCall'

const Navbar = (props) => {
    // const [token,setToken]=useState(null);
    // const isLoggedIn=useSelector((state)=>state.auth.action);
    const { token } = useSelector((state) => state.auth)
 
  const dispatch=useDispatch();
  const navigate=useNavigate();
    // console.log("isLoggedIn",isLoggedIn);
    // let isLoggedIn = props.isLoggedIn;
    // let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className=' flex justify-between mx-auto '>

        <Link to="/"> 
            <img src={logo} alt="Logo" width={160} height={40} loading="lazy"/>
            {/* <h2  width={160} height={32} className=' ring-offset-green-600' >Smart Street Veggies</h2> */}
        </Link>

        <nav className='navbarOne'>
            <ul className='flex gap-3'>
                <li>
                    <Link to="/DashBoard">Home</Link>
                </li>
                <li>
                    <Link to="/">About</Link>
                </li>
                <li>
                    <Link to="/">Contact</Link>
                </li>
            </ul>
        </nav>

        {/* Login - SignUp - LogOut - Dashboard */}
        <div className='navbarTwo'>
        <div className='flex ml-5 mr-3 gap-3'>
            { token===null &&
                <Link to="/login" >
                    <button className='navbarThree'>
                        Login
                    </button>
                </Link>
            }
            { token===null &&
                <Link to="/signup">
                    <button className='navbarFour'>
                        Sign Up
                    </button>
                </Link>
            }
            { token!==null &&
                <Link to="/">
                    <button onClick={() => {
                        // setIsLoggedIn(false);
                        dispatch(logout(navigate))
                        toast.success("Logged Out");
                    }}>
                        <button className='navbarThree'>
                        LogOut
                    </button>
                        {/* Log Out */}
                    </button>
                </Link>
            }
            { token!==null &&
                <Link to="/dashboard">
                    <button className='navbarThree'>
                        DashBoard
                    </button>
                </Link>
            }
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
