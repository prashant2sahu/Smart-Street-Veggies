const express=require("express");
const router=express.Router();

const {makeCartOnline,showCart,hideIndivisualCart,showBookedCart,BookCart}=require("../Controller/cart");
const {auth}=require("../middleware/Mauth");


router.post("/makeCartOnline",auth ,makeCartOnline);
router.get("/showCart", showCart);
router.post("/hideCart",auth,hideIndivisualCart);
router.post("/bookCart",auth,BookCart);
router.get("/showBookedCart",showBookedCart)

module.exports=router;