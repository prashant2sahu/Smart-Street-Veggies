// import React, { useState } from 'react'
// import logo from "../assets/horizon logo.png"
// import {Link, Navigate, useNavigate} from "react-router-dom"
// import {toast} from "react-hot-toast"
// import {useSelector,useDispatch} from "react-redux"
// import { logout } from '../services/operations/authCall'
// import '../StyleSheet/NavBar.css'

// const Navbar = (props) => {
//     // const [token,setToken]=useState(null);
//     // const isLoggedIn=useSelector((state)=>state.auth.action);
//     const { token } = useSelector((state) => state.auth)
 
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//     // console.log("isLoggedIn",isLoggedIn);
//     // let isLoggedIn = props.isLoggedIn;
//     // let setIsLoggedIn = props.setIsLoggedIn;

//   return (
//     // <div className=' flex justify-between mx-auto '>

//     //     <Link to="/"> 
//     //         <img src={logo} alt="Logo" width={160} height={40} loading="lazy"/>
//     //         {/* <h2  width={160} height={32} className=' ring-offset-green-600' >Smart Street Veggies</h2> */}
//     //     </Link>

//     //     <nav className='navbarOne'>
//     //         <ul className='flex gap-3'>
//     //             <li>
//     //                 <Link to="/DashBoard">Home</Link>
//     //             </li>
//     //             <li>
//     //                 <Link to="/">About</Link>
//     //             </li>
//     //             <li>
//     //                 <Link to="/">Contact</Link>
//     //             </li>
//     //         </ul>
//     //     </nav>

//     //     {/* Login - SignUp - LogOut - Dashboard */}
//         // <div className='navbarTwo'>
//         // <div className='flex ml-5 mr-3 gap-3'>
//         //     { token===null &&
//         //         <Link to="/login" >
//         //             <button className='navbarThree'>
//         //                 Login
//         //             </button>
//         //         </Link>
//         //     }
//         //     { token===null &&
//         //         <Link to="/signup">
//         //             <button className='navbarFour'>
//         //                 Sign Up
//         //             </button>
//         //         </Link>
//         //     }
//         //     { token!==null &&
//         //         <Link to="/">
//         //             <button onClick={() => {
//         //                 // setIsLoggedIn(false);
//         //                 dispatch(logout(navigate))
//         //                 toast.success("Logged Out");
//         //             }}>
//         //                 <button className='navbarThree'>
//         //                 LogOut
//         //             </button>
//         //                 {/* Log Out */}
//         //             </button>
//         //         </Link>
//         //     }
//         //     { token!==null &&
//         //         <Link to="/dashboard">
//         //             <button className='navbarThree'>
//         //                 DashBoard
//         //             </button>
//         //         </Link>
//         //     }
//         // </div>
//         // </div>
      
//     // </div>
//     <>
//     <div className='container-fluid'>
//         <div className='container'>
//             <div>
//     <Link to="/"> 
//           <img src={logo} alt="Logo" width={160} height={40} loading="lazy"/>
//      </Link>
//    </div> 

// <div className='navbar-dark'>
//                 <Link to="/DashBoard">Home</Link>            
//                      <Link to="/">About</Link>       
//                     <Link to="/">Contact</Link>
// </div>



//    </div>
//    <div className='navbarTwo'>
//         <div className='flex ml-5 mr-3 gap-3'>
//             { token===null &&
//                 <Link to="/login" >
//                     <button className='navbarThree'>
//                         Login
//                     </button>
//                 </Link>
//             }
//             { token===null &&
//                 <Link to="/signup">
//                     <button className='navbarFour'>
//                         Sign Up
//                     </button>
//                 </Link>
//             }
//             { token!==null &&
//                 <Link to="/">
//                     <button onClick={() => {
//                         // setIsLoggedIn(false);
//                         dispatch(logout(navigate))
//                         toast.success("Logged Out");
//                     }}>
//                         <button className='navbarThree'>
//                         LogOut
//                     </button>
//                         {/* Log Out */}
//                     </button>
//                 </Link>
//             }
//             { token!==null &&
//                 <Link to="/dashboard">
//                     <button className='navbarThree'>
//                         DashBoard
//                     </button>
//                 </Link>
//             }
//         </div>
//         </div>

//     </div>
    
    
//     </>
//   )
// }

// export default Navbar
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/operations/authCall';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../StyleSheet/NavBar.css';
import logo from '../assets/horizon logo.png';
import { getFromLocalStorage } from '../services/operations/SecureLocal';
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 let [accountType,setAccountType]=useState(null)
  const handleLogout = () => {
    dispatch(logout(navigate));
    toast.success('Logged Out');
  };
  useEffect(() => {
    let result = getFromLocalStorage('userData');
    
    if (result) {
      setAccountType(result.accountType);
    
    }
  
 
  }, []);
  
 
  

  return (
   <>
     {/* Main Navbar */}
     <nav className="navbar navbar-expand-lg navbar-dark ThemeColor">
        <div className="container-fluid navKiposition" >
          {/* Logo */}
          <Link to="/" className="navbar-brand pl-5">
            <img src={logo} alt="Logo" width={180} height={80} loading="lazy" />
          </Link>

          {/* Toggle Button for Off-Canvas Menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Navbar */}
          {/* <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link to="/home" id="Hovering"className="nav-link">Home</Link>
              </li>
         
              <li className="nav-item mx-3">
{/* // <<<<<<< master */}
// <<<<<<< master
                {/* <Link to="/contact" id="Hovering" className="nav-link">Know & Reach Us</Link> */}
{/* // ======= */}
              {/* <Link to="/contact" id="Hovering" className="nav-link">Contact</Link> */}
{/* // >>>>>>> master */}
              {/* </li>
=======
                <Link to="/contact" id="Hovering" className="nav-link">Know & Reach Us</Link>
{/* <<<<<<< HEAD
======= */}
{/* // ======= */}
              {/* <Link to="/contact" id="Hovering" className="nav-link">Contact</Link> */}
{/* // >>>>>>> master */}
{/* >>>>>>> b1a9d8163105ac8f79b298843e232b516a7552aa */}
              </li>
// >>>>>>> master
            {accountType==="Customer" && token ?(<>   <li className="nav-item mx-3">
                <Link to="/map-page" id="Hovering" className="nav-link">MAP</Link>
              </li></>):accountType==="CartMan" && token?<>  <li className="nav-item mx-3">
                <Link to="/addveggie" id="Hovering" className="nav-link">AddVeggie</Link>
              </li></>:<></>} */}


            {/* </ul>
         
          </div> */} 

<div className="collapse navbar-collapse justify-content-center">
<ul className="navbar-nav d-flex flex-wrap align-items-center mb-2 mb-lg-0" style={{ gap: "3px" }}>
  <li className="nav-item">
    <Link to="/home" id="Hovering" className="nav-link">Home</Link>
  </li>

  <li className="nav-item">
    <Link to="/contact" id="Hovering" className="nav-link">Know&ReachUs</Link>
  </li>

  <li className="nav-item">
    <Link to="/map-page" id="Hovering" className="nav-link">VeggieList</Link>
  </li>

  {accountType === "Customer" && token ? (
    <li className="nav-item">
      <Link to="/map-display" id="Hovering" className="nav-link">MAP</Link>
    </li>
  ) : accountType === "CartMan" && token ? (
    <li className="nav-item">
      <Link to="/addveggie" id="Hovering" className="nav-link">AddVeggie</Link>
    </li>
  ) : null}
</ul>
</div>
          {/* Authentication Buttons for Desktop */}
          <div className="d-none d-lg-flex">
            {token === null ? (
              <>
                <Link to="/login" className=" text-center btn-light LoginHover">Login</Link>
                <Link to="/signup" className="text-center btn-light LoginHover">Sign Up</Link>
              </>
            ) : (
              <>
                <button className="text-center LoginHover btn-light me-2" onClick={handleLogout}>Log Out</button>
                <Link to="/dashboard" className="text-center LoginHover btn-light">Dashboard</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Off-Canvas Menu for Mobile/Tablet */}
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title  " id="offcanvasNavbarLabel">SMART STREET VEGGIES</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body d-flex flex-column align-items-start">
        {/* Links (Home, About, Contact) */}
        <ul className="list-unstyled mb-3 w-100">
          <li className="mb-2" data-bs-dismiss="offcanvas">
          
            <Link
              to="/home"
              className="text-primary "
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
             // Dismiss the offcanvas
            >
              Home
            </Link>
          </li>
          
          {/* <li className="mb-2" data-bs-dismiss="offcanvas">
            <Link
// <<<<<<< master
// =======
              to="/"
              className="text-primary"
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
             // Dismiss the offcanvas
            >
              About
            </Link>
          </li> */}
          <li className="mb-2" data-bs-dismiss="offcanvas">
            <Link
              to="/contact"
              className="text-primary"
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
              // Dismiss the offcanvas
            >
              Know & Reach Us
            </Link>
          </li>
          <li className="mb-2" data-bs-dismiss="offcanvas">
            <Link
              to="/map-page"
              className="text-primary"
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
              // Dismiss the offcanvas
            >
             MapPage
            </Link>
          </li>
          {accountType==="Customer" && token ?(<>   <li className="mb-2" data-bs-dismiss="offcanvas">
            <Link
              to="/map-page"
              className="text-primary"
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
              // Dismiss the offcanvas
            >
              Map
            </Link>
          </li></>):accountType==="CartMan" && token?<>  <li className="mb-2" data-bs-dismiss="offcanvas">
            <Link
              to="/addVeggie"
              className="text-primary"
              style={{ textDecoration: 'none', width: '100%', display: 'block', padding: '10px', borderRadius: '5px' }}
              // Dismiss the offcanvas
            >
              AddVeggie
            </Link>
          </li></>:<></>}
        </ul>

        {/* Authentication Links (Login, Signup, Logout, Dashboard) */}
        <div className="w-100 " style={{marginTop:"-20px"}}>
          {token === null ? (
            <>
            <span data-bs-dismiss="offcanvas" > <Link to="/login" className="btn -mt-5 btn-outline-light text-primary w-100 text-start mb-2 " >
                Login
              </Link></span> 
              <span data-bs-dismiss="offcanvas"> <Link to="/signup" className="btn btn-outline-light text-start text-primary w-100" >
                Sign Up
              </Link></span>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light text-start text-primary mb-2" onClick={handleLogout}>Log Out</button>
            <span data-bs-dismiss="offcanvas"><Link to="/dashboard" className="btn btn-outline-light text-start text-primary w-100" >
                Dashboard
              </Link></span>  
            </>
          )}
        </div>
      </div>
    </div>


   </>
  );
};

export default Navbar;

