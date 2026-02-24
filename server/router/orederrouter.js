const express = require("express");
const orderRouter = express.Router();
const { createOrderFromCart } = require("../controller/ordercontroler");

orderRouter.post("/order/create", createOrderFromCart);

module.exports = orderRouter;