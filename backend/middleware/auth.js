const jwt=require("jsonwebtoken")
require("dotenv").config();
const User=require("../models/user")

const auth=async(req,res,next)=>{
    try {
        console.log("AUTH MIDDLEWARE HIT");
        const token=req.cookies.token
         console.log("TOKEN:", req.cookies.token);
        if(!token){
            throw new Error("No token provided");
        }
        const decoded= await jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded._id)
        console.log("USER:", user); 
        if(!user){
            throw new Error("User not found");
        }
        req.user=user
        next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized access",error:error.message})
    }
}
module.exports={
    auth
}