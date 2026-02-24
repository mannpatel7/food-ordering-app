const User=require("../models/user")
const bcrypt=require("bcrypt")
const {validatedata}=require("../utilz/validate")


const signup=async(req,res)=>{
    try{
        validatedata(req)

        const {name,email,password,phoneNo}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:passwordHash,
            phoneNo
        })
        
        await user.save()
        res.status(201).json({message:"User created successfully"})
    }catch(error){
        res.status(500).json({message:"Error creating user",error:error.message})
    }
}

const login=async(req,res)=>{
    try {
        const {emailId,password}=req.body
        const user=await User.findOne({ email:emailId})
        if(!user){
            throw new Error("User not found");
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            throw new Error("Invalid credentials");
        }

        const token=await user.getToken();
        res.cookie("token",token)
        res.status(200).json({message:"Login successful"})
    } catch (error) {
        res.status(500).json({message:"Error logging in",error:error.message})
    }
}
const logout=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Logout successful"})
    } catch (error) {
        res.status(500).json({message:"Error logging out",error:error.message})
    }
}

const getuser=async(req,res)=>{
    try {
        const user=req.user
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"Error fetching user",error:error.message})
    }
}

const updateuser=async(req,res)=>{
    try {
        const {name,email,phoneNo}=req.body;
        const user=await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            phoneNo
        },{new:true}) // new=true etale updated value return karse
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"Error updating user",error:error.message})
    }
}
module.exports={
    signup,
    login,
    logout,
    getuser,
    updateuser
}