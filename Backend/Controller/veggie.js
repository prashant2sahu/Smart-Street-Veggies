const expres=require("express");
const Veggie=require("../Models/veggie");
const User=require("../Models/User");
const Cart=require("../Models/Cart");
const veggie = require("../Models/veggie");
const mongoose = require('mongoose');
// const id="662a7181b97b98ee6f0e2d4a";
exports.setVeggiesDetail=async(req,res)=>{
    try{

    const id=req.user.id;
    // const is=req.id;
    const {veggiesName,rate} =req.body;
    const {veggies}=req.body;

    // if(veggies.length  ===0){
    //     res.status(400).json({
    //         success:false,
    //         message:"please fill all the credentials",
    //     })
    // }

    const allVeggiesData=await Veggie.create({veggiesName,rate});
    // const allVeggiesData=await Veggie.create({ veggies});


    // veggies
    console.log("allveggiesDetails",allVeggiesData);
    console.log("input",veggiesName,rate);
    // console.log("input id ",id);


    if(!allVeggiesData){
        res.status(400).json({ 
            success:false,
            message:"Error while uploading the veggies on its model",
        })
    }

    const updatedData=await User.findByIdAndUpdate(id,
                                                   {$push:{veggies:allVeggiesData._id}},
                                                   {new :true}
                                                  );

    // const cartAdded=await Cart.create({$push:{id}});

    // if(!cartAdded){
    //     res.status(400).json({ 
    //         success:false,
    //         message:"Error while uploading the veggies on its model",
    //     })
    // }

    res.status(200).json({
        success:true,
        message:"all the veggies data has been setted successfully",
        updatedData,
        // cartAdded,  
    })

    }catch(error){
        console.log(error.message);
        res.status(400).json({
             succcess:false,
             message:"error while setting veggies Detail"
        })  
     }
}

exports.getVeggies=async(req,res)=>{
        try {
          const allVeggie = await Veggie.find()
          res.status(200).json({
            success: true,
            data: allVeggie,
            message:"done getting veggies"
          })
        } catch (error) {
            console.log(error.message);
          return res.status(500).json({
            success: false,
            message: "error while getting veggies",
          })
        }
    
}
      

// YH BHI ADARSH H
exports.readVeggies = async (req, res) => {
  try {
      const userId = req.user.id; // Get the authenticated user ID

      // Find the user by ID and populate the 'veggies' field to get details of each veggie
      const user = await User.findById(userId).populate('veggies');

      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      res.status(200).json({
          success: true,
          message: "All the veggies data has been fetched successfully",
          veggies: user.veggies, // This will contain the user's veggie records
      });

  } catch (error) {
      console.log(error.message);
      res.status(400).json({
          success: false,
          message: "Error while fetching veggies data",
      });
  }
};





exports.deleteVeggie = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user ID
    let { veggieId } = req.body; // Get the veggieId from the request body

    // Check if the veggieId is in valid ObjectId format

    if (!mongoose.Types.ObjectId.isValid(veggieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid veggieId format",
      });
    }

    // Now we know veggieId is a valid ObjectId, we can proceed with the deletion
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove veggieId from the veggies array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { veggies: veggieId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Veggie not found in user's list",
      });
    }

    // Optionally delete the veggie from the Veggie collection
    await Veggie.findByIdAndDelete(veggieId);

    res.status(200).json({
      success: true,
      message: "Veggie has been successfully deleted",
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({
      success: false,
      message: "Error while deleting veggie",
    });
  }
};
