const express=require("express");
const router=express.Router();

const {setVeggiesDetail,getVeggies} =require("../Controller/veggie");
const {auth} =require("../middleware/Mauth");

router.post("/setVeggies",auth,setVeggiesDetail);
router.get("/getVeggies",getVeggies);
// router.get("/showCart",showCart);



module.exports=router;
