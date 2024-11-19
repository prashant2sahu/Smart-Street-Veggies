const mongoose=require("mongoose");
// const Position =require("../Models/Position");
const userSchema=mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        trim:true
    }, 
    lastName:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        required:true,
        type:String,
        trim:true
    }, 
    password:{
        required:true, 
        type:String,
        // trim:true
    },
    image:{ 
        // required:true,
        type:String,
        // trim:true
    },
    accountType:{
        required:true,
        type:String,
        enum:["CartMan","Customer"],
    }, 
    otp:{
        // required:true,
        type:Number,
// <<<<<<< HEAD
    }, 
// =======
    // },
    number:{
        type:Number,
    },
// >>>>>>> 35674311d64255197669f3e6b374ff9257a2e33d
    token: {
        type: String,
    },
    position:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Position"
    },
    veggies:[{
        //may be array but not now
        type:mongoose.Schema.Types.ObjectId,
        ref:"Veggie"
    }] ,
    cartBooked:[{
        //may be array but not now
        type:mongoose.Schema.Types.ObjectId,
        ref:"CartBook" 
    }] 
})

module.exports = mongoose.model("User",userSchema);