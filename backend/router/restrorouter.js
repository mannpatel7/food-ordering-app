const express=require("express")
const restrouter=express.Router()
const {addrestro,getrestro,approvedresbyId,getrestrobyuserId,getAllRestroRequests,deleteRestroById}=require("../controller/restrocontrol")
const {roleAuth}=require("../middleware/roleAuth")
const {auth}=require("../middleware/auth")

restrouter.post("/addrestro",auth,roleAuth("owner"),addrestro)
restrouter.get("/getrestro",getrestro)
restrouter.get("/getrestrobyuser",auth,roleAuth("owner"),getrestrobyuserId)
restrouter.get("/requests",auth,roleAuth("admin"),getAllRestroRequests)
restrouter.put("/approved/:id",auth,roleAuth("admin"),approvedresbyId)
restrouter.delete("/:id",auth,roleAuth("admin"),deleteRestroById)

module.exports=restrouter
