import React from 'react'
import frameImage from "../assets/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Template = ({title, desc1, desc2, image, formtype, setIsLoggedIn}) => {

    console.log("ye rha mera form type");
    console.log(formtype)
  return (
//     <div className='loginFormMain'>
//         <div>
//             <h1>{title}</h1>
//             <p>
//                 <span>{desc1}</span>
//                 <span>{desc2}</span>
//             </p>

//             <div className='loginFormOne'> 

//             {formtype === "signup" ? 
//             (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
//             (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

    
// {/* 
//             <button>
//                 <p>Sign Up with Google</p>
//             </button> */}
//             </div>
//             </div>

//         </div>
<>
<div className='container-fluid d-flex justify-content-center align-items-center min-vh-100'>
  <div className='container'>
    <div className='loginFormMain row'>
      {/* Left side - Text only for mobile */}
      <div className='col-12 text-center d-block d-sm-none'>
        <h1>{title}</h1>
        <p className="lead">
          <span>{desc1}</span><br />
          <span>{desc2}</span>
        </p>
      </div>

      {/* Form - Always visible */}
      <div className='container'>
        <div className='loginFormOne'>
          {formtype === "signup" ? 
            (<SignupForm setIsLoggedIn={setIsLoggedIn} />) : 
            (<LoginForm setIsLoggedIn={setIsLoggedIn} />)
          }
        </div>
      </div>
    </div>
  </div>
</div>


</>
      
  )
}

export default Template
