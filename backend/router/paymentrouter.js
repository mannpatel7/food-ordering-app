const express = require("express");
const paymentrouter = express.Router();

const { createPayment, verifyPayment } = require("../controller/payment");

paymentrouter.post("/payment/create", createPayment);
paymentrouter.post("/payment/verify", verifyPayment)

module.exports = paymentrouter;