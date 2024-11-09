const mongoose=require("mongoose");

const positionSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lat:{
        type:String,
        trim:true,
        expires:1*60
    },
    lng:{
        type:String,
        trim:true,
        expires:1*60
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model("Position",positionSchema);