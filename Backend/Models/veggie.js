const mongoose=require("mongoose");

const veggieSchema=mongoose.Schema({
    veggiesName:{
        type:String,
        // trim:true
        required:true
    },
    rate:{
        type:String,
        // trim:true 
        required:true
    }
    // veggeis:{
    //     type:Array
    // }

})
 
module.exports=mongoose.model("Veggie",veggieSchema);