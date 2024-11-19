


// import {createSlice} from "@reduxjs/toolkit";
// import { useReducer } from "react";

// const initialState={
//     loading:null,
//     SignupData:null,
//     token:null
// }

// const authSlice= createSlice({
//     name:"auth",
//     initialState:initialState,
//     reducer:{
//         setToken(state,action){
//                 state.token=action.payload;
//         },
//         setSignupData(state,action){
//             state.SignupData = action.payload;
//         },
//         setLoading(state,action){
//             state.loading = action.payload;
//         },
//     },

// })

// export const {setToken,setSignupData} =authSlice.actions;
// export default authSlice.reducer;

// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: null,
    signupData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    accountType:"Customer",
    // isLoggedIn:true
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAccountType(state, action) {
            state.accountType = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setSignupData(state, action) {
            state.signupData = action.payload;
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },
        
    },
});

export const { setToken, setSignupData, setLoading,setAccountType,setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;

