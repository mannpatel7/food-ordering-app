const express=require("express")
const menueRouter=express.Router()

const {addmenue,getmenueByresId,getmenueById,deleteMenue}=require("../controller/menuecontroll")
const {auth}=require("../middleware/auth")
const {roleAuth}=require("../middleware/roleAuth")

menueRouter.post("/menu/addmenue",auth,roleAuth("owner"),addmenue)
menueRouter.get("/restaurant/:id/menu",getmenueByresId)
menueRouter.get("/menu/:id",getmenueById)
menueRouter.delete("/menu/:id",auth,roleAuth("owner"),deleteMenue)

module.exports=menueRouter
