const express=require("express");
const router=express.Router();

const {signup,login,sendOtp,forgotPassword,resetPassword,deleteAcc,updateUserDetails} =require("../Controller/auth");
const {setPosition} =require("../Controller/position");
const {auth} =require("../middleware/Mauth");


router.post("/login", login);

router.post("/signup",signup);

router.delete('/deleteAcc', deleteAcc);

router.post("/updateUserDetails",updateUserDetails);

router.post("/sendOtp",sendOtp);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword", resetPassword);


// router.post("/setPosition",auth,setPosition)
 
module.exports=router;