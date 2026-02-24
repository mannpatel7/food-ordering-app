const express=require("express")
const restrouter=express.Router()
const {addrestro,getrestro,getrestroById}=require("../controller/restrocontrol")

restrouter.post("/addrestro",addrestro)
restrouter.get("/getrestro",getrestro)
restrouter.get("/getrestro/:id",getrestroById)

module.exports=restrouter