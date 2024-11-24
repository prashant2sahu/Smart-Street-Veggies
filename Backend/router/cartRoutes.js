const express=require("express");
const router=express.Router();

const {makeCartOnline,showCart,hideIndivisualCart,showBookedCart,BookCart,updateCartStatus,deleteCart}=require("../Controller/cart");
const {auth}=require("../middleware/Mauth");


router.post("/makeCartOnline",auth ,makeCartOnline);
router.get("/showCart", showCart);
router.post("/hideCart",auth,hideIndivisualCart);
router.post("/bookCart",auth,BookCart);
router.get("/showBookedCart",showBookedCart)
router.patch('/updateCartStatus/:cartId', updateCartStatus);
router.delete('/deleteCart/:cartId', deleteCart);
module.exports=router;