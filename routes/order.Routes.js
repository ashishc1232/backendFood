const express=require("express")
const orderRoutes=express.Router();
const { createOrder, updateOrder, getOrder }=require('../controllers/order.controller');
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


orderRoutes.post("/",authMiddleware,roleMiddleware("USER"),createOrder);
orderRoutes.get("/",authMiddleware,roleMiddleware("USER"),getOrder);
orderRoutes.get("/admin",authMiddleware,roleMiddleware("ADMIN"),getOrder)
orderRoutes.patch("/:orderId/status",authMiddleware,roleMiddleware("ADMIN"),updateOrder)

module.exports=orderRoutes;

