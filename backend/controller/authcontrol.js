const User=require("../models/user")
const bcrypt=require("bcrypt")
const {validatedata}=require("../utilz/validate")


const signup=async(req,res)=>{
    try{
        validatedata(req)

        const {name,email,password,phoneNo,role,address}=req.body;
        const role1=role.toLowerCase()
        if(role1!=="user" && role1!=="owner"){
            return res.status(400).json({message:"Role must be either user or owner"})
        }
        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:passwordHash,
            phoneNo,
            role,
            address
        })
        
        await user.save()
        res.status(201).json({message:"User created successfully"})
    }catch(error){
        let msg = error.message;
        if (error.code === 11000) {
            msg = "Email is already registered";
        }
        res.status(400).json({message: msg})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({ email})
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token=await user.getToken();
        res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false 
});

res.status(200).json({
  message: "Login successful"
});
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
        const {name,email,phoneNo,address}=req.body;
        const user=await User.findByIdAndUpdate(req.user._id,{
            name,
            email,
            phoneNo,
            address
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