
const Cart = require("../models/cart")
const Menue = require("../models/menue");



const addToCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    for (let newItem of items) {

      const existingItem = cart.items.find(
        item => item.menuItem.toString() === newItem.menuItem
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } 
      else {
        cart.items.push(newItem);
      }
    }

    let total = 0;

    for (let item of cart.items) {
      const menu = await Menue.findById(item.menuItem);
      if (menu) {
        total += menu.price * item.quantity;
      }
    }

    cart.totalPrice = total;

    await cart.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding to cart",
      error: error.message
    });
  }
};
const getCartByUserId=async(req,res)=>{
    try {
        const {user}=req.params
        const cartItems=await Cart.find({user:user}).populate("items.menuItem")
        res.status(200).json({cartItems})
    } catch (error) {
        res.status(500).json({message:"Error fetching cart items",error:error.message})
    }
}

const removeFromCart = async (req, res) => {
  try {
    const { user, menuItem } = req.body;

    const cart = await Cart.findOne({ user });

    const item = cart.items.find(
      i => i.menuItem.toString() === menuItem
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        i => i.menuItem.toString() !== menuItem
      );
    }

    await cart.save();

    res.status(200).json({
      message: "Item removed successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error removing item",
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userid } = req.body;

    const cart = await Cart.findOne({ user: userid });

    if(cart){
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
    }

    res.status(200).json({message:"Cart cleared successfully"});

  } catch (error) {
    res.status(500).json({
      message: "Error clearing cart",
      error: error.message
    });
  }
};
module.exports={
    addToCart,
    clearCart,
    getCartByUserId,
    removeFromCart
}