const express =require("express");
const app=express();
const user=require("./router/user");
const veggie=require("./router/veggieRoutes");
const cart=require("./router/cartRoutes");
const cookieParser=require("cookie-parser");
const cors = require("cors")  
require("dotenv").config();
const PORT=process.env.PORT || 4000 ;  

const dbConnection=require("./config/dbConnect");
dbConnection(); 

app.use(express.json());
    
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(
	cors({
		origin: "http://localhost:3000",       
		credentials: true,  
	})  
);  
// routes    
app.use("/api/v1/user",user);
app.use("/api/v1/veggies",veggie);
app.use("/api/v1/cart",cart);



app.listen(PORT,()=>{
    console.log(`App is running or ${PORT}`);
});
