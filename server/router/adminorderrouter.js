const express=require('express')
const adminorderRouter=express.Router()
const {getAllorders,updateOrderStatus}=require('../controller/adminorder')

adminorderRouter.get('/admin/orders',getAllorders)
adminorderRouter.put('/admin/orders/:id/status',updateOrderStatus)

module.exports=adminorderRouter