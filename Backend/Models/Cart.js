const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
        stall:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
})

module.exports=mongoose.model("Cart",cartSchema);