const Restaurant=require('../models/Restaurant');
const menuItems=require('../models/MenuItem')

const createMenuItem = async (req, res, next) => {
try {
    const {name,price,restaurantId}=req.body
    const restaurant=await Restaurant.findById(restaurantId)
    if(!restaurant){
        throw new Error("Restaurant is not found");
    }
    if(restaurant.ownerID.toString()!==req.user.id){
         throw new Error("Not authorize to add menu items");
    }
    const menuItem=await menuItems.create({
        name,price,restaurantId
    })
    res.status(201).json({
        success:true,
        data:menuItem,
    })
} catch (error) {
    next(error)
}

}

const getMenuItem = async (req, res, next) => {
try {
    const {restaurantId}=req.params
    
    const menuItem=await menuItems.find({
       restaurantId,
       isAvailable:true
    })
    res.status(200).json({
        success:true,
        data:menuItem,
    })
} catch (error) {
    next(error)
}
}

module.exports={createMenuItem,getMenuItem}