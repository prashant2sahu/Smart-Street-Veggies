const mongoose=require("mongoose");

const cartBookSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        expires:2*60
    }
})
module.exports=mongoose.model("CartBook",cartBookSchema);