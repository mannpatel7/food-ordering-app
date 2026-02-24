
const Cart = require("../models/cart")
const Menue = require("../models/menue");



const addToCart = async (req, res) => 
{
  try {
    const { user, items } = req.body;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    
    cart.items.push(...items);

    
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

const removeFromCart=async(req,res)=>{
    try {
        const {cartItemId}=req.params
        await Cart.findByIdAndDelete(cartItemId)
        res.status(200).json({message:"Item removed from cart successfully"})
    }catch (error) {
        res.status(500).json({message:"Error removing from cart",error:error.message})
    }
}

module.exports={
    addToCart,
    getCartByUserId,
    removeFromCart
}