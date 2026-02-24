const Restaurant=require("../models/restaurant")

const addrestro=async(req,res)=>{
    try {
        const {id,name,cuisine,rating,isPreferred,image,costfortwo,isPromoted,mapEmbed}=req.body
        const restro=new Restaurant({
            id,name,cuisine,rating,isPreferred,image,costfortwo,isPromoted,mapEmbed
        })
        await restro.save()
        res.status(201).json({message:"Restaurant added successfully"})
    } catch (error) {
        res.status(500).json({message:"Error adding restaurant",error})
    }
}
const getrestro=async(req,res)=>{
    try {
        const restaurants=await Restaurant.find()
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({message:"Error fetching restaurants",error})
    }
}

const getrestroById=async(req,res)=>{
    try {
        const {id}=req.params
        const restaurant=await Restaurant.findOne({id})
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json({message:"Error fetching restaurant by ID",error})
    }
}

module.exports={
    addrestro,
    getrestro,
    getrestroById
}