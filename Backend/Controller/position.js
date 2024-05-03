const Position =require("../Models/Position");
const User=require("../Models/User");



exports.setPosition=async(req,res)=>{
   try{

    const id=req.user.id;
    // const is=req.id;
    const {lat,lng} =req.body;

    if(!lat,!lng){
        res.status(400).json({
            success:false,
            message:"please fill all the credentials",
        })
    }

    const position=await Position.create({lat,lng});


    // veggies
    console.log("position",position);
    console.log("input",lat,lng);


    if(!position){
        res.status(400).json({ 
            success:false,
            message:"Error while uploading the position on its model",
        })
    }

    const updatedData=await User.findByIdAndUpdate(id,
                                                   {$push:{position:position._id}},
                                                   {new :true}
                                                  );

    return res.status(200).json({
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
