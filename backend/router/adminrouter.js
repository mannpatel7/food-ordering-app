const express=require('express')
const adminRouter=express.Router()
const {getAllUsers,getoneUser,updateRole,deleteUser}=require('../controller/admincontroler')

adminRouter.get('/users',getAllUsers)
adminRouter.get('/users/:id',getoneUser)
adminRouter.put('/users/:id/role',updateRole)
adminRouter.delete('/users/:id',deleteUser)

module.exports=adminRouter