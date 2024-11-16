const BASE_URL=process.env.REACT_APP_BASE_URL;

export const  endpoint ={
    //user
    SEND_OTP:BASE_URL+ "/user/sendOtp",
    LOGIN:BASE_URL+ "/user/login",
    SIGN_UP: BASE_URL+ "/user/signup",
    SET_POS: BASE_URL+ "/user/setPosition",
    FORGOT: BASE_URL+"/user/forgotPassword",
    DELETE_ACCOUNT:BASE_URL+"/user/deleteAcc",
    UPDATE_ACCOUNT:BASE_URL+"/user/updateUserDetails",

    RESET_PASSWORD:BASE_URL+"/user/resetPassword",
    // veggies 
    SAVE_VEG_API:BASE_URL+"/veggies/setVeggies",
    READ_VEG_API:BASE_URL+"/veggies/readVeggies",
    DELETE_VEG_API: BASE_URL + "/veggies/deleteVeggie",
    
    // cart online here 
    MAKE_ONLINE:BASE_URL +"/cart/makeCartOnline",
    SHOW_CART:BASE_URL+"/cart/showCart",
    BOOK_CART:BASE_URL+"/cart/bookCart",
    SHOW_BOOKED_CART:BASE_URL+"/cart/showBookedCart",

    
}
