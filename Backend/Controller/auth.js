const User=require("../Models/User");
// const OTP =require("../Models/OTP");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser");
// const sendVerificationMail = require('../Models/OTP').sendVerificationMail;
const { OTP, sendVerificationMail } = require('../Models/OTP'); 

const otpGenerator=require("otp-generator");
const express=require("express");
express.json();

exports.signup=async(req ,res)=>{

    try{

        const {firstName,lastName,accountType,email,otp,password,confirmPassword}=req.body;
        
        if(!firstName || !lastName || !accountType || !email || !otp || !password || !confirmPassword){
            res.status(400).json({
                success:false,
                message:"All field is required",
            })
        }
        
        const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

        if(password!== confirmPassword){
            res.status(400).json({
                success:false,
                message:"Password does not matched",
            })
        }

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is null ",
			});
		}
        else if(otp !== response[0].otp.toString().trim()) {
			// Invalid OTP
        console.log(otp);
        console.log(response[0].otp);

			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
        // console.log("completed passed brother");
        const hashedPass= await bcrypt.hash(password,10);

        const data=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPass,
            otp,
            accountType,
			// image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            
        })

        res.status(200).json({
            success:true,
            message:"Signup process done",
            data:data
        })
        


    }catch(error){
        console.error(error.message);
        console.log(error);
        res.status(400).json({
            success:false,
            message:"error while signup guys",
        })
    }

}
    
exports.login=async(req ,res)=>{

    try{
        const {email,password}=req.body;
        
        if(!email || !password ){
            res.status(400).json({
                success:false,
                message:"All field is required",
            })
        }
        
        const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exists. Please signup  to continue.",
			});
		}

        

        // let hashedPass=bcrypt.hash(password,10);
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }

        if(await bcrypt.compare(password, user.password)){
            //Now matched
            console.log("compairation");
            const token=jwt.sign(payload,
                                process.env.JWT_SECRET,
                                // {expireIn: "24h"}
                            )

            
            user.token=token;
            // user.password=undefined;
            const option={
                expires:new Date( Date.now() +3*24*60*60*1000), 
                httpOnly:true,              
            }
            res.cookie("token",token,option).status(200).json({
                success:true,
                message:" login successfull",
                token,
                user,
                accountType:user.accountType,
            })                 
            }else{
                res.status(400).json({
                    success:false,
                    message:"password is wrong || not matched",
                })
            }

            // return accountType;
       


    }catch(error){
        console.log(error);
        console.error(error);
        res.status(400).json({
            success:false,
            message:"error while login guys",
        })
    }

}

exports.sendOtp=async(req,res)=>{
    try{
        const { email} =req.body;
        
        if(!email){
            res.status(400).json({
                success:false,
                message:"all crediential is required",
            })
        }
        //validation
        const user=await User.find({email});
        
        // if(user){
            //     res.status(400).json({
                //         success:false,
                //         message:"alredy eist",
                //     })
                
                // }
                let otp=otpGenerator.generate(6,{
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                })
                
    // console.log("otp",otp);
    let result=await OTP.find({otp});
    console.log("otp",otp);
    // console.log("result",result);

    while(result){
         otp=otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })   
    result=await OTP.findOne({otp});

    } 

    const otpBody=await OTP.create({email,otp});

    res.status(200).json({
        success:true,
        message:"done in otp crontroler",
        otp
    })
    
    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"error in send otp",
        })
    }
}
// <<<<<<< HEAD
// =======

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Generate a new OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Save the OTP in the database (update if exists)
        const otpRecord = await OTP.findOneAndUpdate(
            { email }, // filter by email
            { otp, createdAt: Date.now() }, // update OTP and created time
            { upsert: true, new: true } // upsert: true will create a new record if not found
        );

        // Send the OTP via email
        await sendVerificationMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending OTP",
        });
    }
};
  
  exports.resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;
  
      if (!email || !otp || !newPassword || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }
  
      // Find the latest OTP for the email
      const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
  
      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          message: "No OTP found for this email or OTP has expired.",
        });
      }
  
      console.log("Found OTP record:", otpRecord);
  
      // Check if the OTP matches
      if (otpRecord.otp !== otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
  
      // OTP is valid, proceed with password reset
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
  
      return res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error while resetting password",
      });
    }
  };
  
// >>>>>>> 008b1003dedf8d9e3e7a98e9f9314bf5ee121697
