// handles business logic for placing order
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const { allowTranscations } = require("../utils/orderStatusflow");


// controller only called this function and send response
const createOrder = async (userId, data) => {
    // fetch restaurantId and items from req.body - services not directly depends on req object 
    const { restaurantId, items } = data
    const restaurant = await Restaurant.findById(restaurantId);
    // validate resto exist or not
    if (!restaurant) throw new Error("Restaurant not found");
    if (!restaurant.isOpen) throw new Error("Restaurant is closed");

    let totalAmount = 0

    const orderItems = [];

    for (let item of items) {
        // each menu item we have to fetch
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem || !menuItem.isAvailable) {
            throw new Error("unavailable menu item.Please choose another one");
        }
        const itemTotal = menuItem.price * item.quantity;
        totalAmount = totalAmount + itemTotal

        orderItems.push({
            menuItemId: menuItem._id,
            quantity: item.quantity,
            priceAtOrderTime: menuItem.price,
        });
    }
    // order status will be by default placed
    const order = await Order.create({
        userId,
        restaurantId,
        items: orderItems,
        totalAmount
    })

    // return to order controller
    return order
}

// update Order status - but ensures that changes only done by through admin
// restaurant admin handle all of those things

const updateStatus = async (orderId, newStatus, adminId) => {
    const order = await Order.findById(orderId).populate("restaurantId");
    if (!order) {
        //order must be exist for update
        throw new Error("order not found");
    }
    // authorize -check owenership (only admin can update own restaurant orders)
    if (order.restaurantId.ownerID.toString() !== adminId) {// adminId will be came in string and mongodb id(number)
        throw new Error("you not  allowed to update this order");
    }

    //get current order status
    const currentStatus=order.status;

    //validate status 
    const nextStatus=allowTranscations[currentStatus]

    if(!nextStatus.includes(newStatus)){
        throw new Error(`invalid status updation ${currentStatus} to ${newStatus}`);
    }
    order.status=newStatus; // updation done
    await order.save(); // save method works like create in mongodb
    
    // return updated order status
    return order; 
}
module.exports={createOrder,updateStatus}