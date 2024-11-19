import {endpoint} from "../apis"
import {apiConnector} from "../apiConnector";
import {setIsLoggedIn, setLoading} from "../../Redux/slices/authSlice"
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import {setToken} from "../../Redux/slices/authSlice";
import {saveToLocalStorage} from '../operations/SecureLocal'
// import jwt from "jsonwebtoken"
// const {accountType}=useSelector((state)=>state.auth.action);
    // const 
const {SEND_OTP, LOGIN ,SIGN_UP,SAVE_VEG_API,MAKE_ONLINE,DELETE_ACCOUNT,SET_POS,READ_VEG_API,UPDATE_ACCOUNT,DELETE_VEG_API,FORGOT,RESET_PASSWORD,FETCH_USER} = endpoint;
// const token = localStorage.getItem("token");
 
const BASE_URL=process.env.BASE_URL;
export function SendOtp(email,navigate){
    return async(dispatch)=>{
        const taostId=toast.loading("Loading....");
        dispatch(setLoading(true))
        try{ 
        console.log("andar uhiu");
        
        const response= await apiConnector("POST",SEND_OTP,{email,checkUserPresent: true});

            console.log("otp response",response.data);
            console.log("eamil",email);
            console.log(SEND_OTP);
            toast.success("OTP send successsfully ")
            navigate("/verify-email")
        }catch(error){
                    console.log("error while otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(taostId)
    }
}
export function ReSendOtp(email,navigate){
  return async(dispatch)=>{
      const taostId=toast.loading("Loading....");
      dispatch(setLoading(true))
      try{ 
      console.log("andar uhiu");
      
      const response= await apiConnector("POST",SEND_OTP,{email,checkUserPresent: true});

          console.log("otp response",response.data);
          console.log("eamil",email);
          console.log(SEND_OTP);
          toast.success("OTP send successsfully ")
          navigate("/resetPassword")
          
      }catch(error){
                  console.log("error while otp")
      }
      dispatch(setLoading(false))
      toast.dismiss(taostId)
  }
}


export function SignUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate ){
  return async(dispatch)=>{
    const taostId=toast.loading("Loading....");
    dispatch(setLoading(true))
        
        try{
            const response= await apiConnector("POST",SIGN_UP,{
                accountType,firstName,lastName,otp, email,password,confirmPassword
            }, )
            console.log("response..........".response.data);
            
            if(!response.data.success){
                // throw new Error(response.data.message)
                // toast.error("somet")
                // toast.error("error",response.data.message)
                return response.data.message;
            }

            navigate("/login");
            toast.success("Signup successfully");
        }catch(error){
            console.log("error in signup functon in services");
            toast.error(error.message);
        }
        dispatch(setLoading(false))
         toast.dismiss(taostId)
    }
  }

  
export function login(email,password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      let data;
      try {
        const response = await apiConnector("POST",LOGIN,{
          email,
          password,
                }, {"Content-Type": "application/json",})
        // const decode = await jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        // console.log(decode);
        console.log("LOGIN API RESPONSE............", response.data)
        data=response.data.accountType
        console.log(data);
        if (!response.data.success) {
          // toast
          throw new Error(response.data.message)
        }
  
       data==="CartMan" ? navigate("/addVeggie"): data==="Customer" ?  navigate("/map-display") : navigate("/map-display");
        // localStorage.setItem("accountType", JSON.stringify(decode.accountType));
        localStorage.setItem("accountType", JSON.stringify(response.data.accountType))
        saveToLocalStorage("isLoggedIn",true)
        saveToLocalStorage("userData", {accountType:response.data.accountType,firstName:response.data.user.firstName ,lastName:response.data.user.lastName,email:response.data.user.email,id:response.data.user._id})
     console.log(response.data.user.firstName);

        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        window.location.reload()
        toast.success("Login Successful")
        dispatch(setIsLoggedIn(true));
        // return;
        // const token = data.token;
        // Store token in local storage or state
        // localStorage.setItem("token", token); // Store token in local storage
       
        // const userImage = response.data?.user?.image
        //   ? response.data.user.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        // dispatch(setUser({ ...response.data.user, image: userImage }))
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
        // toast.error( error.message)


      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      // dispatch(setUser(null))
      // dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("accountType")
      localStorage.removeItem("userData")
      localStorage.removeItem("isLoggedIn")
      
      // localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
 
// export function setPosition(lat,lng,token) {
//   return async (dispatch) => {
//     // const toastId = toast.loading("Loading...")
//     // dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST",SET_POS,{
//         lat,lng,
//       },{Authorization: `Bearer ${token}`})

//       console.log("POsition API RESPONSE............", response)
//       if (!response.data.success) {
//         // toast
//         throw new Error(response.data.message)
//       }
//       return response;

//       // toast.success("Login Successful")
//       // navigate("/dashboard")
//     }catch(error) {
//       console.log("setPosition API ERROR............",error.message)
//       // toast.error("setPosition Failed")
//   // /    toast.error( error.message)
// // 

//     }
//     // dispatch(setLoading(false))
//     // toast.dismiss(toastId)
//   }
// }

export function SaveVeggiesHere(veggiesName,rate,token,navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    console.log("veggiesName and rate",veggiesName,rate);
    try {
      const response = await apiConnector("POST",SAVE_VEG_API,{
        veggiesName,rate
      },{authorization: `Bearer ${token}`})

      console.log("Getting veggies API RESPONSE............", response)

      if (!response.data.success) {
        // toast
        throw new Error(response.data.message)
      }

      toast.success("Veggies saved successfully")
      //  navigate("/home")
    } catch (error) {
      console.log("veggies API ERROR............", error)
      toast.error("Failed to save veggies")
      toast.error( error.message)


    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// <<<<<<< HEAD
// idhar adarsh ka kaam hai
export function FetchUserVeggies(token) {
  return async (dispatch) => {
  
    
    try {
      const response = await apiConnector(
        "GET",READ_VEG_API,
        "/readVeggies", // Replace with the actual endpoint if different
        {},
        { authorization: `Bearer ${token}` }
      );

      console.log("Fetching veggies API RESPONSE............", response.data.veggies);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
     
    
      toast.success("Veggies data fetched successfully");
      return response.data.veggies;
    } catch (error) {
      console.log("Fetching veggies API ERROR............", error);
  
    }
  };
}


// export function DeleteVeggie(token, veggieId) {
//   return async (dispatch) => {
//     try {
//       // Construct the DELETE URL
     
//       // Log the full URL for debugging
// console.log("AuthCall :" , veggieId)
//       // Making the DELETE request with the correct Authorization header
//       const response = await apiConnector(
//         "POST",  // HTTP method
//         DELETE_VEG_API ,// API URL
//         {veggieId},  // No body data for DELETE request
//         {
//           "Authorization": `Bearer ${token}`  // Add the Authorization header correctly
//         }
//       );

//       // Log the response data
//       console.log("Delete Veggie API RESPONSE:", response.data);

//       // Check if the response indicates a successful deletion
//       if (!response.data.success) {
//         // If not successful, throw an error with the message from the API response
//         throw new Error(response.data.message || "Failed to delete veggie");
//       }

//       // Show success toast message
//       toast.success("Veggie deleted successfully");

//       // Optionally, return the response data if needed
//       return response.data;
//     } catch (error) {
//       // If an error occurs, log it and show an error toast
//       console.log("Delete Veggie API ERROR:", error.response ? error.response.data : error.message);
//       toast.error("Failed to delete veggie");
//     }
//   };
// }
export function DeleteVeggie(token, veggieId) {
  return async (dispatch) => {
    try {
      // Correct DELETE URL
    // Assuming /deleteVeggie is correct
      console.log("Delete Veggie URL: " , veggieId, token);

      const response = await apiConnector(
        "POST",  // Use DELETE method
        DELETE_VEG_API,       // URL with the proper path
        { veggieId },  // Send veggieId in body (if the backend expects it)
        {
          "Authorization": `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete veggie");
      }

      toast.success("Veggie deleted successfully");
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete veggie");
    }
  };
}

// export function SaveVeggiesHere(veggiesName,rate,token,navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     console.log("veggiesName and rate",veggiesName,rate,token);
//     console.log("Headers:", { Authorization: `Bearer ${token}` });

//     try {
//       const response = await apiConnector("POST",SAVE_VEG_API,
//         { veggiesName,rate},
//         { Authorization:`Bearer ${token}`})

//         console.log("Headers:", { Authorization: `Bearer ${token}` });

//       console.log("Getting veggies API RESPONSE............", response)

//       if (!response.data.success) {
//         // toast
//         throw new Error(response.data.message)
//       }

//       toast.success("Veggies saved successfully")
//       //  navigate("/home")
//     } catch (error) {
//       console.log("veggies API ERROR............", error)
//       toast.error("Failed to save veggies")
//       toast.error( error.message)


//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// >>>>>>> 8319f7e8bb78464687d182c4c83e89fed6ad2edd

// authCall.js
export async function ForgotPassword(email) {
  try {
    console.log(email);
    const response = await apiConnector('POST', FORGOT, { email });
    console.log(response);
    return response.data; // Return the actual data directly
  } catch (error) {
    console.log(error, " Forgot password");
    throw new Error(error.response?.data?.message || 'Error occurred while sending OTP.');
  }
}



export const resetPassword = async (email, otp, newPassword, confirmPassword) => {
  try {
    // Check if all fields are provided
    // if (!email || !otp || !newPassword || !confirmPassword) {
    //   return {
    //     success: false,
    //     message: "All fields are required.",
    //   };
    // }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    // Prepare the request payload
    const payload = { email, otp, newPassword, confirmPassword };

    // Make API call using the apiConnector
    const response = await apiConnector(
    'POST',
    RESET_PASSWORD
     , {email, otp, newPassword, confirmPassword}  // The data to be sent in the request body
    );

    // Handle success and return response
    return {
      success: true,
      message: response.data.message || 'Password has been reset successfully.',
    };
  } catch (error) {
    // Handle errors
    return {
      success: false,
      message: error.response?.data?.message || 'Error occurred while resetting password.',
    };
  }
};

// apiConnector.js

export async function deleteUserAccount(email,navigate) {
  if (!email) {
      console.error("Email is required to delete account.");
      return;
  }

  try {
      const result = await apiConnector("DELETE",DELETE_ACCOUNT,{email});

     
      if (result.success) {
        window.location.href="/signup"
        console.log("Account deleted successfully.");
        
        // Redirect to the signup page after account is deleted
        localStorage.clear()
      // Adjust the path as per your routes
    } else {
        console.error("Failed to delete account:", result.message);
    }
      return result; // Return the result to handle in the calling function
  } catch (error) {
      console.error("Error in API call:", error);
      return { success: false, message: "API call failed" };
  }
}


export async function updateUserDetails(data) {
  try {
    // Make the POST request to the API
    console.log(data ,"yh authcall ka data");
    const response = await apiConnector('POST', UPDATE_ACCOUNT, {data});

    if (response?.status === 200) {
      toast.success('User details updated successfully!');
      return true;
    } else {
      toast.error(response?.data?.message || 'Failed to update user details.');
      return false;
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    toast.error('An error occurred while updating user details. Please try again.');
    return false;
  }
}

export function FetchUserData(userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    console.log("inside api connector",userId);
    
    try {
      console.log("id", userId);
      const response = await apiConnector(
        "GET",
        `${FETCH_USER}/${userId}`,
        // {userId}
        // { Authorization: `Bearer ${token}` } // Pass headers correctly here
      );

      console.log("fetch userdata API RESPONSE............", response.data.data);
      // navigate("/login");
      // navigate("")
      // need to add navigation

      // toast.success("Your Cart is Booked");

      // if (!response.data.data.success) {
      //   throw new Error(response.data.message);
      // }
      return response.data.data;

    } catch (error) {
      console.log("fetch user API ERROR............", error);
      // toast.error("Failed to make cart online");
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

