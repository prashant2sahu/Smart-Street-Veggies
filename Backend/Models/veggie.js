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
// const mongoose = require("mongoose");

// // Define the schema for each veggie item
// const veggieItemSchema = new mongoose.Schema({
//     veggiesName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     rate: {
//         type: Number,
//         required: true,
//         min: 0,  // Rate should be non-negative
//     },
// });

// // Define the main schema for a veggie cart, which contains an array of veggies
// const veggieCartSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',  // Assume each cart is associated with a user
//         required: true,
//     },
//     veggies: {
//         type: [veggieItemSchema],  // Array of veggie items
//         required: true,
//         validate: [arrayLimit, 'Veggie cart must have at least one item.']
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// // Custom validator to ensure the veggies array is not empty
// function arrayLimit(val) {
//     return val.length > 0;
// }

// // Create and export the VeggieCart model
// module.exports = mongoose.model("VeggieCart", veggieCartSchema);
