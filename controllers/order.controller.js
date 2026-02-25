const Order = require("../models/Order.js");
const orderService = require("../services/Order.service.js")
const createOrder = async (req, res, next) => {
    //req.user.id, 
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error)
    }
}
// changes in backend for fetching order
const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        next(error)
    }
}
const updateOrder = async (req, res, next) => {

    try {
        const { orderId } = req.params;
        const { status } = req.body

        const adminId = req.user.id

        const update = await orderService.updateStatus(
            orderId,
            status,
            adminId
        );
        res.status(200).json({
            success: true,
            data: update,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { createOrder, updateOrder,getOrder }