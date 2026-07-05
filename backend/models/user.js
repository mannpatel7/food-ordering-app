const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        minLength:8,
    },
    role:{
        type:String,
        enum:["user","owner","admin"],
        default:"user"
    },
    phoneNo:{
        type:Number,
        min:10
    },
    address:{
        type:String,
        trim:true
    },
},{timestamps:true})

userSchema.methods.getToken=async function () {
    const user=this
    const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    return token
}

module.exports=mongoose.model("User",userSchema);