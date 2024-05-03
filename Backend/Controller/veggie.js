const expres=require("express");
const Veggie=require("../Models/veggie");
const User=require("../Models/User");
const Cart=require("../Models/Cart");

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
      
