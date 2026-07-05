const Restaurant=require("../models/restaurant")
const Menue=require("../models/menue")

const addrestro = async (req,res)=>{
    try {

        const {name,cuisine,image,costfortwo,mapEmbed,menuItems=[]} = req.body

        const restro = new Restaurant({
            name,
            cuisine,
            image,
            costForTwo: costfortwo,
            mapEmbed,
            owner: req.user._id,
            isApproved:false
        })

        await restro.save()

        const validMenuItems=Array.isArray(menuItems)
            ? menuItems.filter((item)=>
                item.name?.trim() &&
                item.category?.trim() &&
                Number(item.price)>0
              )
            : []

        if(validMenuItems.length){
            await Menue.insertMany(validMenuItems.map((item,index)=>({
                id:Date.now()+index,
                restaurantId:restro._id,
                name:item.name.trim(),
                category:item.category.trim(),
                price:Number(item.price),
                isVeg:Boolean(item.isVeg),
                image:item.image?.trim() || ""
            })))
        }

        res.status(201).json({success: true,
            message:"Restaurant request sent to admin for approval",
            restaurant:restro,
            menuItemsAdded:validMenuItems.length
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Error adding restaurant",
            error:error.message
        })
    }
}
const getrestro=async(req,res)=>{
    try {
        const restaurants=await Restaurant.find({isApproved:true})
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({message:"Error fetching restaurants",error})
    }
}

const getrestrobyuserId=async(req,res)=>{
    try {
        const restaurants=await Restaurant.find({owner:req.user._id})
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({message:"Error fetching restaurants",error})
    }
}

const getAllRestroRequests=async(req,res)=>{
    try {
        const restaurants=await Restaurant.find()
            .populate("owner","name email phoneNo")
            .sort({createdAt:-1})
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({
            message:"Error fetching restaurant requests",
            error:error.message
        })
    }
}

const approvedresbyId=async(req,res)=>{
    try {
        const {id}=req.params
        const restaurant=await Restaurant.findByIdAndUpdate(id,{isApproved:true},{new:true})
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json({message:"Error fetching restaurant by ID",error})
    }
}

const deleteRestroById=async(req,res)=>{
    try {
        const {id}=req.params
        const restaurant=await Restaurant.findByIdAndDelete(id)
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.status(200).json({
            success:true,
            message:"Restaurant removed successfully",
            restaurant
        })
    } catch (error) {
        res.status(500).json({
            message:"Error removing restaurant",
            error:error.message
        })
    }
}

module.exports={
    addrestro,
    getrestro,
    approvedresbyId,
    getrestrobyuserId,
    getAllRestroRequests,
    deleteRestroById
}
