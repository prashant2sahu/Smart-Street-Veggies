import React from 'react'
import frameImage from "../assets/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Template = ({title, desc1, desc2, image, formtype, setIsLoggedIn}) => {

    console.log("ye rha mera form type");
    console.log(formtype)
  return (
    <div className='loginFormMain'>
        <div>
            <h1>{title}</h1>
            <p>
                <span>{desc1}</span>
                <span>{desc2}</span>
            </p>

            <div className='loginFormOne'> 

            {formtype === "signup" ? 
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
            (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

            <div className='templateOne'>
            
            
                <div></div>
                <p className='paraLogin'>OR</p>
                <div></div>

            <button>
                <p>Sign Up with Google</p>
            </button>
            </div>
            </div>

        </div>

        {/* <div>
            <img src={frameImage}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"/>

            <img src={image}
                alt="Students"
                width={558}
                height={490}
                loading="lazy"/>    
        </div> */}

    </div>
  )
}

export default Template
