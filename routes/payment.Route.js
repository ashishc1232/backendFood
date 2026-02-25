const express=require("express")
const paymentRoutes=express.Router();
const { initialPayment, verifyPayment }=require("../controllers/payment.controller");
const authMiddleware = require("../middleware/auth.middleware");

paymentRoutes.post('/initiate',authMiddleware, initialPayment);
paymentRoutes.post('/verify',authMiddleware,verifyPayment);

module.exports=paymentRoutes