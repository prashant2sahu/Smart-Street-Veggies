const mongoose= require("mongoose");

function connection(){
    mongoose.connect(process.env.MONGO_DB)
    .then(()=>{ console.log("Connection successfull");})
    .catch((error)=>{
        console.log("Error while connecting with db");
        console.error(error);
    })
}
module.exports= connection;