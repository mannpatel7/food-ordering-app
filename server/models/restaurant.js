const mongoose=require("mongoose")

const Restschema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
    },
    rating:{
        type:Number
    },
    isPreferred:{
        type:Boolean
    },
    image:{
        type:String
    },
    costfortwo:{
        type:Number
    },
    isPromoted:{
        type:Boolean
    },
    mapEmbed:{
        type:String
    },
})

module.exports=mongoose.model("Restaurant",Restschema)