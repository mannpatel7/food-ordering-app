const User=require("../models/user")

const getAllUsers=async(req,res)=>{
    try {
        const user=await User.find()
        if(!user)
            throw new Error("There are no User")

        res.status(200).json({user})
    } catch (error) {
       res.status(500).json({message:"Error in finding the user",error:error.message})
    }
}

const getoneUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id)
        if(!user)
            throw new Error("User not found")
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:"Error in finding the user",error:error.message})
    }
}

const updateRole=async(req,res)=>{
    try {
        const {id}=req.params
        const {role}=req.body

        const user=await User.findByIdAndUpdate(id,{
            role
        },{new:true})
        if(!user)
            throw new Error("User not found")
        
        res.status(200).json({user})

    } catch (error) {
        res.status(500).json({message:"Error updating user",error:error.message})
    }
}

const deleteUser=async(req,res)=>{
   try{const {id}=req.params
    await User.findByIdAndDelete(id)
    res.status(201).json({message:"Successfully deleted"})}
    catch(error){
        res.status(500).json({message:"Error in deleting user",error:error.message})
    }
}

module.exports={
    getAllUsers,getoneUser,updateRole,deleteUser
}  