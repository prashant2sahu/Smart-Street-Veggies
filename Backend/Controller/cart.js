// const Veggie=require("../Models/veggie");
const User=require("../Models/User");
const Cart=require("../Models/Cart");
const { populate } = require("dotenv");
const CartBook=require("../Models/CartBook");


exports.makeCartOnline=async(req,res)=>{
   try{  
    const id=req.user.id;
    console.log(id);
    const cartData=await Cart.create({stall:id});

    res.status(200).json({
        succcess:true,
        message:"data added to  cart successfully",
        cartData
    })}
    catch(error){
        console.log(error);
        res.status(500).json({
            succcess:true,
            message:" error in data added to cart"
        })  
    }
}


exports.showCart=async(req,res)=>{
    try {
      const allVeggie = await Cart.find()
                                  .populate({path:"stall",
                                             populate:"veggies"}
                                            )
    //   many things to do here
      res.status(200).json({
        success: true,
        data: allVeggie,
        message:"done getting cart"
      })
    } catch (error) {
        console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "error while getting cart",
      })
    }

}

exports.hideIndivisualCart=async(req,res)=>{
    try{
        const id=req.user.id;
        if(!id){
            res.status(400).json({
                success:false,
                message:" id not  found"
            })
        }
        const deletedCart=await Cart.findOneAndDelete({stall:id});

        res.status(200).json({
            success:true,
            message:"Indivisual cart has been deleted ",
            deletedCart
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"errror while deleting indivisual cart"
        })
    }
}

exports.BookCart=async(req,res)=>{
    try{
        const id=req.user.id;
        if(!id){
            res.status(400).json({
                success:false,
                message:" id not  found"
            })
        }

        const BookedCart=await CartBook.create({user:id});

        res.status(200).json({
            success:true,
            message:"Cart Booked successfully ",
            BookedCart
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"errror while Booking the cart"
        })
    } 
}

exports.showBookedCart=async(req,res)=>{
    try {
        const BookedCart = await CartBook.find()
                                    .populate({path:"user",
                                               }
                                              )
      //   many things to do here
        res.status(200).json({
          success: true,
          data: BookedCart,
          message:"successfully shown the booked cart"
        })
      } catch (error) {
          console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "error while showing the booked cart",
        })
      }
  
}