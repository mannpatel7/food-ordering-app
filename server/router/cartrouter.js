const express=require("express")
const cartRouter=express.Router()

const {addToCart,clearCart,getCartByUserId,removeFromCart}=require("../controller/cartrcontroller")

cartRouter.post("/cart/add",addToCart)
cartRouter.get("/cart/:user",getCartByUserId)
cartRouter.delete("/cart/remove",removeFromCart)
cartRouter.delete("/cart/clear",clearCart)

module.exports=cartRouter