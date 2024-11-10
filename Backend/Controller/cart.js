// const Veggie=require("../Models/veggie");
const User=require("../Models/User");
const Cart=require("../Models/Cart");
const { populate } = require("dotenv");
const CartBook=require("../Models/CartBook");
const veggieCartSchema=require("../Models/veggie")

exports.makeCartOnline=async(req,res)=>{
   try{  
    const id=req.user.id;
    // const id =
    //         req.cookies.token.id ||
    //         req.body.token.id ||
    //         (req.headers.Authorization && req.headers.Authorization.split(" ")[1]);

    console.log(id);
    const cartData=await Cart.create({stall:id});
    console.log("makingCrt online");
    

    res.status(200).json({
        succcess:true,
        message:"data added to  cart successfully",
        cartData
    })}
    catch(error){
        console.log(error);
        res.status(500).json({
            succcess:false,
            message:" error in data added to cart"
        })  
    }
}

// const VeggieCart = require('../models/VeggieCart');
// const User = require('../models/User');

// exports.makeCartOnline = async (req, res) => {
//     try {
//         const userId = req.user.id;  // Assuming req.user contains user info from middleware
//         const { veggies } = req.body;  // Array of veggies with {veggiesName, rate}

//         if (!veggies || veggies.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Veggies array cannot be empty."
//             });
//         }

//         // Create the new cart with embedded veggie items
//         const cartData = await veggieCartSchema.create({
//             user: userId,
//             veggies: veggies.map(({ veggiesName, rate }) => ({ veggiesName, rate })),
//         });

//         // Add the newly created cart's ID to the user's veggies array
//         await User.findByIdAndUpdate(
//             userId,
//             { $push: { veggies: cartData._id } },
//             { new: true, useFindAndModify: false }  // Returns the updated document
//         );

//         res.status(200).json({
//             success: true,
//             message: "Cart created successfully and added to user's veggies list.",
//             cartData
//         });
//     } catch (error) {
//         console.error("Error creating cart:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error creating cart",
//             error: error.message
//         });
//     }
// };


exports.showCart=async(req,res)=>{
    try {
      const allVeggie = await Cart.find()
                                  .populate({path:"stall",
                                             populate:[{

                                                 path:"position"
                                            },{
                                                path:"veggies"
                                             }

                                             ]
                                            }                                             
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