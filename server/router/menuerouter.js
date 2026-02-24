const express=require("express")
const menueRouter=express.Router()

const {addmenue,getmenueByresId,getmenueById}=require("../controller/menuecontroll")
const menue = require("../models/menue")

menueRouter.post("/menu/addmenue",addmenue)
menueRouter.get("/restaurant/:id/menu",getmenueByresId)
menueRouter.get("/menu/:id",getmenueById)

module.exports=menueRouter