const Menue=require("../models/menue")
const Restaurant=require("../models/restaurant")

const addmenue=async(req,res)=>{
    try{
        const {restaurantId,name,category,price,isVeg,image}=req.body
        const restaurant=await Restaurant.findOne({
            _id:restaurantId,
            owner:req.user._id,
            isApproved:true
        })
        if(!restaurant){
            return res.status(403).json({
                message:"Only approved restaurants can receive menu items"
            })
        }
        const menue=new Menue({
            id:Date.now(),
            restaurantId,
            name,
            category,
            price,
            isVeg,
            image
        })
        await menue.save()
        res.status(201).json({
            message:"Menu item added successfully",
            menue
        })
    }catch(error){
        res.status(500).json({message:"Error adding menue item",error:error.message})
    }
}

const getmenueByresId = async (req, res) => {
  try {
    const { id } = req.params;

    const menue = await Menue.find({ restaurantId: id })
      .populate("restaurantId", "name cuisine rating mapEmbed image");

    if (menue.length === 0) {
      return res.status(404).json({ message: "Menu Items not found" });
    }

    res.status(200).json({ success: true, menue });

  } catch (error) {
    res.status(500).json({
      message: "Error showing menu items",
      error: error.message
    });
  }
};

const getmenueById=async(req,res)=>{
    try {
        const {id}=req.params
        const menue=await Menue.findOne({id})
        if(!menue){
           return res.status(404).json({message:"Menue Item not found"})
        }
        res.status(201).json({menue})

    } catch (error) {
        res.status(500).json({message:"Error showing menue item",error:error.message})
    }
}

const deleteMenue=async(req,res)=>{
    try {
        const {id}=req.params
        const item=await Menue.findById(id).populate("restaurantId","owner")
        if(!item){
            return res.status(404).json({message:"Menu item not found"})
        }
        if(item.restaurantId.owner.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"Access denied"})
        }
        await Menue.findByIdAndDelete(id)
        res.status(200).json({message:"Menu item removed successfully"})
    } catch (error) {
        res.status(500).json({
            message:"Error removing menu item",
            error:error.message
        })
    }
}
module.exports={
    addmenue,
    getmenueByresId,
    getmenueById,
    deleteMenue
}

