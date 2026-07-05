const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    cuisine:{
        type:String
    },

    rating:{
        type:Number,
        default:0
    },

    image:{
        type:String
    },

    costForTwo:{
        type:Number
    },

    isPreferred:{
        type:Boolean,
        default:false
    },

    isPromoted:{
        type:Boolean,
        default:false
    },

    mapEmbed:{
        type:String
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    isApproved:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Restaurant", restaurantSchema)