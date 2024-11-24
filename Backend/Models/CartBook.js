const mongoose=require("mongoose");

const cartBookSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        // expires:2*60
    },
    status: {
        type: String,
        enum: ["deactivated", "accepted", "delivered"],
        default: "deactivated",
    },
    
}, { timestamps: true } )
module.exports=mongoose.model("CartBook",cartBookSchema);