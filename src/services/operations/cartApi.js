import {endpoint} from "../apis"
import {apiConnector} from "../apiConnector";
import {setLoading} from "../../Redux/slices/authSlice"
import toast from "react-hot-toast";

const {MAKE_ONLINE,SHOW_CART,SHOW_BOOKED_CART,BOOK_CART} = endpoint;


export function ShowOnlineCart() {
    return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      let result=[];
      try {
        const response = await apiConnector(
          "GET",
          SHOW_CART
        );
  
        // console.log("here it is  API RESPONSE............", response);
        // navigate("/login");
        // navigate("")
        // need to add navigation
  
        // toast.success("online carts");
        result=response.data.data;
        console.log("result",result);
        return result;

        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("makeCartOnline API ERROR............", error);
        // toast.error("Failed to make cart online");
        toast.error(error.message);
      }
      dispatch(setLoading(false));
    //   toast.dismiss(toastId);
    };
  }
  
  

export function makeCartOnline(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        console.log("token in apicall ", token);
        const response = await apiConnector(
          "POST",
          MAKE_ONLINE,
          null,
          { Authorization: `Bearer ${token}` } // Pass headers correctly here
        );
  
        console.log("makeCartOnline API RESPONSE............", response);
        navigate("/map-display");
        // navigate("")
        // need to add navigation
  
        toast.success("Your Cart is online");
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("makeCartOnline API ERROR............", error);
        // toast.error("Failed to make cart online");
        // toast.error(error.message);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }
  

  export function BookCart(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        console.log("token in apicall ", token);
        const response = await apiConnector(
          "POST",
          BOOK_CART,
          null,
          { Authorization: `Bearer ${token}` } // Pass headers correctly here
        );
  
        console.log("makeCartOnline API RESPONSE............", response);
        // navigate("/login");
        // navigate("")
        // need to add navigation
  
        toast.success("Your Cart is Booked");
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("BOOK CART API ERROR............", error);
        // toast.error("Failed to make cart online");
        toast.error(error.message);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }
  

  export function showBookedCart() {
    return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      let result=[];
      try {
        const response = await apiConnector(
          "GET",
          SHOW_BOOKED_CART
        );
  
        // console.log("here it is  API RESPONSE............", response);
        // navigate("/login");
        // navigate("")
        // need to add navigation
  
        // toast.success("online carts");
        result=response.data.data;
        console.log("result",result);
        return result;

        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log("makeCartOnline API ERROR............", error);
        // toast.error("Failed to make cart online");
        toast.error(error.message);
      }
      dispatch(setLoading(false));
    //   toast.dismiss(toastId);
    };
  }
  
  