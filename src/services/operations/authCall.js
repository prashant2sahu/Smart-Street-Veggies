import {endpoint} from "../apis"
import {apiConnector} from "../apiConnector";
import {setIsLoggedIn, setLoading} from "../../Redux/slices/authSlice"
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import {setToken} from "../../Redux/slices/authSlice";
// import jwt from "jsonwebtoken"
// const {accountType}=useSelector((state)=>state.auth.action);
    // const 
const {SEND_OTP, LOGIN ,SIGN_UP,SAVE_VEG_API,MAKE_ONLINE,SET_POS} = endpoint;
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
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
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
      
      // localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }

export function setPosition(lat,lng,token) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST",SET_POS,{
        lat,lng,
      },{Authorization: `Bearer ${token}`})

      console.log("POsition API RESPONSE............", response)
      if (!response.data.success) {
        // toast
        throw new Error(response.data.message)
      }
      return response;

      // toast.success("Login Successful")
      // navigate("/dashboard")
    }catch(error) {
      console.log("setPosition API ERROR............",error.message)
      // toast.error("setPosition Failed")
  // /    toast.error( error.message)
// 

    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}


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

