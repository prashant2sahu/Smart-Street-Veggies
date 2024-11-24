const express=require("express");
const router=express.Router();

const {setVeggiesDetail,getVeggies,readVeggies,deleteVeggie,cartBookVeggie} =require("../Controller/veggie");
const {auth} =require("../middleware/Mauth");

router.post("/setVeggies",auth,setVeggiesDetail);
router.get("/getVeggies",getVeggies);
router.get("/readVeggies",auth,readVeggies)
router.post("/deleteVeggie", auth, deleteVeggie);
router.get("/cartBookVeggie/:userId", cartBookVeggie);

// router.get("/showCart",showCart);



module.exports=router;
