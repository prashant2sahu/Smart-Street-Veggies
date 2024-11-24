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
        const cartmanId=req.body.cartmanId;
        if(!id){
            res.status(400).json({
                success:false,
                message:" id not  found"
            })
        }
        console.log("id and catmanid",cartmanId);
        
        const BookedCart=await CartBook.create({user:id});
        console.log("id", id);
        
        const updatedUser=await User.findOneAndUpdate({ _id:cartmanId},
            // {$push:BookedCart._id},
            { $push: { cartBooked: BookedCart._id } },
            {new:true}
        );

 
        res.status(200).json({
            success:true,
            message:"Cart Booked successfully ",
            BookedCart,
            updatedUser
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

// idhar adarsh ne banai hai api okay 
exports.updateCartStatus = async (req, res) => {
    try {
        const { cartId } = req.params; // Get cartId from the request params
        const { status } = req.body;   // Get the new status from request body

        // Validate input
        if (!["deactivated", "accepted", "delivered"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value.",
            });
        }

        // Find the cart entry by ID and update the status
        const updatedCart = await CartBook.findByIdAndUpdate(
            cartId,
            { status },
            { new: true } // Return the updated document
        );

        // Check if cart entry was found
        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart entry not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart status updated successfully.",
            data: updatedCart,
        });
    } catch (error) {
        console.log("Error updating cart status:", error);
        res.status(500).json({
            success: false,
            message: "Error updating cart status.",
        });
    }
};


exports.deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params; // Get the cartId from the request parameters
        console.log("cart ki id agayi backend me",cartId);
        // Find the cart entry by ID and delete it
        const deletedCart = await CartBook.findByIdAndDelete(cartId);

        // Check if the cart entry was found and deleted
        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart entry not found.",
            });
        }

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Cart entry deleted successfully.",
            data: deletedCart, // Return the deleted entry for confirmation if needed
        });
    } catch (error) {
        console.error("Error deleting cart entry:", error);

        // Handle server errors
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the cart entry.",
        });
    }
};
