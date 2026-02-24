const Cart = require("../models/cart");
const Order = require("../models/order");
const Menue = require("../models/menue");

const createOrderFromCart = async (req, res) => {
  try {
    const { user, paymentMethod, deliveryAddress } = req.body;
    
    const cart = await Cart.findOne({ user });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    
    const orderItems = [];
    let totalAmount = 0;

    for (let item of cart.items) {
      const menu = await Menue.findById(item.menuItem);

      if (!menu) continue;

      const itemTotal = menu.price * item.quantity;

      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        priceAtOrderTime: menu.price
      });

      totalAmount += itemTotal;
    }

    
    const order = new Order({
      user,
      items: orderItems,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid"
    });

    await order.save();

    
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message
    });
  }
};

module.exports = {
  createOrderFromCart
};