const express=require("express");
const router=express.Router();

const {signup,login,sendOtp} =require("../Controller/auth");
const {setPosition} =require("../Controller/position");
const {auth} =require("../middleware/Mauth");


router.post("/login", login);

router.post("/signup",signup);

router.post("/sendOtp",sendOtp);

router.post("/setPosition",auth,setPosition)
 
module.exports=router;