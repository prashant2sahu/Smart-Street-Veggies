import {endpoint} from "../apis"
import {apiConnector} from "../apiConnector";
import {setLoading} from "../../Redux/slices/authSlice"
import toast from "react-hot-toast";
import axios from 'axios';

const {MAKE_ONLINE,SHOW_CART,SHOW_BOOKED_CART,BOOK_CART,CART_UPDATE,CART_DELETE,USER_VEGGIES_API} = endpoint;

// services/operations/cartApi.js

// export const saveVeggieCart = (veggies, token, navigate) => async (dispatch) => {
//     // try {
//     //     // API endpoint to save the entire cart
//         try {
//           const response = await apiConnector(
//             "POST",
//             MAKE_ONLINE,
//             {veggies},
//             {
//                Authorization: `Bearer ${token}`,   // Attach token for authentication
//               'Content-Type': 'application/json'
//            }

//           );
//         // const response = await axios.post(
//         //     'http://localhost:5000/api/v1/cart/makeCartOnline',    // Adjust endpoint as per your backend
//         //     { veggies },             // Sending the veggies array in the request body
//         //     {
//         //         headers: {
//         //             Authorization: `Bearer ${token}`,   // Attach token for authentication
//         //             'Content-Type': 'application/json'
//         //         }
//         //     }
//         // );

//         console.log("Cart saved successfully:", response.data);
        
//         // Optional: Dispatch an action to update the store if needed
//         dispatch({
//             type: 'SAVE_CART_SUCCESS',
//             payload: response.data
//         });

//         // Redirect user after saving
//         navigate('/map-display');  // Adjust the path as per your routes
//     } catch (error) {
//         console.error("Error saving cart:", error);
        
//         // Dispatch an error action for failure cases if required
//         dispatch({
//             type: 'SAVE_CART_FAILURE',
//             payload: error.message
//         });
//     }
// }

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
          { Authorization:`Bearer ${token}` } // Pass headers correctly here
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

      // if (error.response && error.response.status === 401) {
      //   toast.error("Session expired. Please log in again.");
      //   navigate("/login"); // Optionally navigate to login page
      // } else {
      //   toast.error(error.message || "Failed to make cart online");
      // }
        // toast.error("Failed to make cart online");
        // toast.error(error.message);
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }
  

  export function BookCart(cartmanId,token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        console.log("token in apicall and cartmanId", token ,cartmanId);
        const response = await apiConnector(
          "POST",
          BOOK_CART,
          {cartmanId},
          { Authorization: `Bearer ${token}` } // Pass headers correctly here
        );
  
        console.log("makeCartOnline API RESPONSE............", response,"CARRnab",cartmanId);
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
  
  export const updateCartStatus = async (cartId, newStatus) => {
    try {
      console.log(cartId,"updated");
        const response = await apiConnector("PATCH", `${CART_UPDATE}/${cartId}`, {
            status: newStatus,
        });

        return response.data; // Assuming `response.data` contains the updated data
    } catch (error) {
        console.error("Error in updateCartStatus:", error.response?.data || error.message);
        throw error; // Rethrow to handle in the calling function
    }
};

export const deleteCart = async (cartId) => {
  try {
      const response = await apiConnector("DELETE", `${CART_DELETE}/${cartId}`);

      return response.data; // Assuming `response.data` contains confirmation of deletion
  } catch (error) {
      console.error("Error in deleteCart:", error.response?.data || error.message);
      throw error; // Rethrow to handle in the calling function
  }
};
export const cartBookVeggie = async (userId) => {
  try {
    let id = localStorage.getItem("userId");
    console.log(id);
    
    // Make API call with dynamic userId and pass the id as query parameter
    const response = await apiConnector("GET", `${USER_VEGGIES_API}/${userId}?id=${id}`);

    // Log the complete response for debugging
    console.log("User Veggies API Response:", response);

    if (response && response.data) {
      const { veggies, user, cartStatus } = response.data;

      if (!veggies || !user) {
        throw new Error("Missing data in response: veggies or user not found");
      }

      console.log("Fetched User:", user);
      console.log("Fetched Veggies:", veggies);
      console.log("CartBooked Data:", cartStatus); // Log cartBooked for debugging

      // Return an object with user, veggies, and cartBooked data
      return { user, veggies, cartStatus };
    }
  } catch (e) {
    console.error("Error in fetching data:", e.response?.data || e.message);
    throw e;
  }
};

