const mongoose=require("mongoose")

const dbConnect = async ()=>{
    await mongoose.connect("mongodb+srv://mann_patel:Mann5483@burger.w9xsndk.mongodb.net/")
}

module.exports={
    dbConnect,
}