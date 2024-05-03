const mongoose=require("mongoose");

const positionSchema=mongoose.Schema({
    lat:{
        type:String,
        trim:true,
        expires:1*60
    },
    lng:{
        type:String,
        trim:true,
        expires:1*60

    }
})

module.exports=mongoose.model("Position",positionSchema);