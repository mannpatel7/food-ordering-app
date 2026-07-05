const Order=require('../models/order')

const getAllorders=async (req,res)=>{
    try{const order=await Order.find()
    if(!order){
        throw new Error("There is no Order")
    }
    
    res.status(201).json({order})
}catch(error){
    res.status(500).json({message:"Error in finding the order",error:error.message})
}
}

const updateOrderStatus=async (req,res)=>{
    try {
        const {id}=req.params
        const {status}=req.body
        const order=await Order.findByIdAndUpdate(id,{
            status
        },{new:true})
        res.status(201).json({order})

    } catch (error) {
        res.status(500).json({message:"Error in updating the order",error:error.message})
    }
}

module.exports={
    getAllorders,updateOrderStatus
}