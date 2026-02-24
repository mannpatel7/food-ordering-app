const express=require("express")
const cartRouter=express.Router()

const {addToCart,getCartByUserId,removeFromCart}=require("../controller/cartrcontroller")

cartRouter.post("/cart/add",addToCart)
cartRouter.get("/cart/:user",getCartByUserId)
cartRouter.delete("/cart/remove/:cartItemId",removeFromCart)

module.exports=cartRouter