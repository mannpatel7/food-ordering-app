const express = require("express");
const orderRouter = express.Router();
const { createOrderFromCart,getorders,fetchOrderbyresId,getOwnerOrders,updateOwnerOrderStatus} = require("../controller/ordercontroler");
const {auth}=require("../middleware/auth")
const {roleAuth}=require("../middleware/roleAuth")


orderRouter.post("/order/create", createOrderFromCart);
orderRouter.get("/order/res/:restaurantId",fetchOrderbyresId)
orderRouter.get("/order/:user", getorders)
orderRouter.get("/owner/orders",auth,roleAuth("owner"),getOwnerOrders)
orderRouter.put("/owner/orders/:id/status",auth,roleAuth("owner"),updateOwnerOrderStatus)
module.exports = orderRouter;
