const express =require("express");
const app=express();
const user=require("./router/user");
const veggie=require("./router/veggieRoutes");
const cart=require("./router/cartRoutes");
const cookieParser=require("cookie-parser");
const cors = require("cors")  
require("dotenv").config();
const {updateLocationInDb}= require("./Controller/position")
const https= require("http"); 
const {Server}= require("socket.io");
// const fs = require("fs");
// const createServer=require("https");

const PORT=process.env.PORT || 4000 ;  
const dbConnection=require("./config/dbConnect");
dbConnection(); 

app.use(express.json());
    
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
 
// socket 



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



const server=https.createServer(
	// {
	// 	key: fs.readFileSync("path/to/your/ssl.key"),
	// 	cert: fs.readFileSync("path/to/your/ssl.crt"),
	//   },
	  app);
const  io= new Server(server,{
    cors:{
        origin:"*",
        credentials:true,     
    }
}); 

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);
	
	socket.on('updateLocation', async (data) => {
        const { userId, latitude, longitude } = data;

        try {
            const updatedLocation = await updateLocationInDb(userId, latitude, longitude);

            // Emit the updated location to other users if necessary
            // socket.broadcast.emit('locationUpdate', {
            //     userId,
            //     latitude: updatedLocation.latitude,
            //     longitude: updatedLocation.longitude
				
            // });
			console.log("locatioon updated")
			
        } catch (error) {
            console.error("Failed to update location in DB:", error);
        }
    });

	socket.on("disconnect", () => {
	  console.log("User disconnected:", socket.id);
	});


  });
server.listen(PORT,()=>{
    console.log(`App is running or ${PORT}`);
});
