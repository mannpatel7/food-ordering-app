const express=require("express")
const authRouter=express.Router()
const bcrypt=require("bcrypt")
const {auth}=require("../middleware/auth")
const {signup,login,logout,getuser,updateuser}=require("../controller/authcontrol")

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.get("/getuser",auth,getuser)
authRouter.put("/updateuser",auth,updateuser)

module.exports=authRouter

