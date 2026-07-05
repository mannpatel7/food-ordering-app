const Razorpay = require("razorpay");
const Cart = require("../models/cart");
const Menue = require("../models/menue");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createPayment = async (req, res) => {
  try {
    const { user } = req.body;

    console.log("User:", user);

    const cart = await Cart.findOne({ user });
    console.log("Cart:", cart);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    for (let item of cart.items) {
      const menu = await Menue.findById(item.menuItem);
      if (!menu) continue;

      totalAmount += menu.price * item.quantity;
    }

    console.log("TOTAL AMOUNT:", totalAmount);

    if (totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    console.log("OPTIONS:", options);

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      razorpayOrder,
      totalAmount,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error);

    res.status(500).json({
      message: "Error creating Razorpay order",
      error: error.error || error.message
    });
  }
};

// /api/payment/verify
const crypto = require("crypto");

const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
};
module.exports = { createPayment, verifyPayment };