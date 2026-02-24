const mongoose=require("mongoose")


const menueSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Restaurant"
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isVeg:{
        type:Boolean,
        required:true
    },
    image:{
        type:String
    }

})
module.exports=mongoose.model("Menue",menueSchema)