const Position =require("../Models/Position");
const User=require("../Models/User");



// exports.setPosition=async(req,res)=>{
//    try{

//     const id=req.user.id;
//     // const is=req.id;
//     const {lat,lng} =req.body;

//     if(!lat,!lng){
//         res.status(400).json({
//             success:false,
//             message:"please fill all the credentials",
//         })
//     }

//     const position=await Position.create({lat,lng});


//     // veggies
//     console.log("position",position);
//     console.log("input",lat,lng);


//     if(!position){
//         res.status(400).json({ 
//             success:false,
//             message:"Error while uploading the position on its model",
//         })
//     }

//     const updatedData=await User.findByIdAndUpdate(id,
//                                                     {$push:{position:position._id}},
//                                                     {new :true}
//                                                   );

//     return res.status(200).json({
//         success:true,
//         message:"all the veggies data has been setted successfully",
//         updatedData,
//         // cartAdded,  
//     })

//     }catch(error){
//         console.log(error.message);
//         res.status(400).json({
//              succcess:false,
//              message:"error while setting veggies Detail"
//         })  
//      }
// }

// controllers/locationController.js 

exports.updateLocationInDb = async (userId, latitude, longitude) => {
    try {

        const locationData = {
            userId,
            lat: latitude,  // Make sure this matches `lat` in your schema
            lng: longitude, 
            timestamp: new Date()
        };
 
        // Update the location if it already exists, or create a new one
        const updatedLocation = await Position.findOneAndUpdate(
            { userId },             // Filter by userId
            { $set: locationData },  // Update latitude, longitude, and timestamp
            { upsert: true, new: true }
        );

        // return updatedLocation;
        const updatedData=await User.findByIdAndUpdate(userId,
            {$set:{position:updatedLocation._id}},
            {new :true}
           );

           return updatedLocation;
        // return res.status(200).json({
        // success:true,
        // message:"location has been setted successfully",
        // updatedData,
        // updatedLocation
// cartAdded,  
        // })
    } catch (error) {
        console.error("Error updating location:", error);
        throw error;
    }
};

// module.exports = { updateLocationInDb };
