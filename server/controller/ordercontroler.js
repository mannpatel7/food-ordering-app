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
        restaurantId: menu.restaurantId,
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
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid"
    });

    await order.save();

    
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: "Order db placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message
    });
  }
};
const fetchOrderbyresId=async(req,res)=>{
  try {
    const {restaurantId}=req.params
    const orders=await Order.find({"items.restaurantId":restaurantId}).populate("items.menuItem")
    res.status(200).json({orders})
  } catch (error) {
    res.status(500).json({message:"Error in finding the order",error:error.message})
  }
}
const getorders = async (req, res) => {
  try {
    const { user } = req.params;

    const order = await Order.find({ user }).populate("items.menuItem");

    if (order.length === 0) {
      return res.status(200).json({ order: [] });
    }

    res.status(200).json({ order });

  } catch (error) {
    res.status(500).json({
      message: "Error in finding the order",
      error: error.message
    });
  }
};

const getOwnerOrders = async (req,res)=>{
  try {
    const restaurants=await require("../models/restaurant").find({
      owner:req.user._id
    }).select("_id name")
    const restaurantIds=restaurants.map((restaurant)=>restaurant._id)
    const orders=await Order.find({
      "items.restaurantId":{$in:restaurantIds}
    })
      .populate("user","name email phoneNo")
      .populate("items.menuItem","name image category")
      .populate("items.restaurantId","name")
      .sort({createdAt:-1})

    res.status(200).json({orders,restaurants})
  } catch (error) {
    res.status(500).json({
      message:"Error fetching owner orders",
      error:error.message
    })
  }
}

const updateOwnerOrderStatus = async (req,res)=>{
  try {
    const {id}=req.params
    const {status}=req.body
    const allowedStatuses=[
      "Pending","Confirmed","Preparing","Out for Delivery","Delivered","Cancelled"
    ]
    if(!allowedStatuses.includes(status)){
      return res.status(400).json({message:"Invalid order status"})
    }

    const restaurants=await require("../models/restaurant").find({
      owner:req.user._id
    }).select("_id")
    const restaurantIds=restaurants.map((restaurant)=>restaurant._id)
    const update = status === "Delivered"
      ? {status,paymentStatus:"Paid"}
      : {status}

    const order=await Order.findOneAndUpdate(
      {_id:id,"items.restaurantId":{$in:restaurantIds}},
      update,
      {new:true}
    )
      .populate("user","name email phoneNo")
      .populate("items.menuItem","name image category")
      .populate("items.restaurantId","name")

    if(!order){
      return res.status(404).json({message:"Order not found"})
    }
    res.status(200).json({order})
  } catch (error) {
    res.status(500).json({
      message:"Error updating order status",
      error:error.message
    })
  }
}
module.exports = {
  createOrderFromCart,
  getorders,
  fetchOrderbyresId,
  getOwnerOrders,
  updateOwnerOrderStatus
};

