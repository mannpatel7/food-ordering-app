const Menue=require("../models/menue")

const addmenue=async(req,res)=>{
    try{
        const {id,restaurantId,name,category,price,isVeg,image}=req.body
        const menue=new Menue({
            id,restaurantId,name,category,price,isVeg,image
        })
        await menue.save()
        res.status(201).json({message:"Menue item added successfully"}) 
    }catch(error){
        res.status(500).json({message:"Error adding menue item",error:error.message})
    }
}

const getmenueByresId = async (req, res) => {
  try {
    const { id } = req.params;

    const menue = await Menue.find({ restaurantId: id })
      .populate("restaurantId", "name cuisine rating");

    if (menue.length === 0) {
      return res.status(404).json({ message: "Menu Items not found" });
    }

    res.status(200).json({ menue });

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
module.exports={
    addmenue,
    getmenueByresId,
    getmenueById
}

