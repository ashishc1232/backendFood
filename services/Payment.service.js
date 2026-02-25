// real gateways- Razorpay/ Stripe 
const Order = require("../models/Order");
const Payment = require("../models/Payment");

//fake transcation id
const generateTranscationId = () => {
    return "TXN_" + Date.now();
};

// initial payment- works like real payment gateways

const initialPayment = async (orderId, method) => {
    // fetch order from database
    const order = await Order.findById(orderId)
    if(!order) {
        throw new Error("Order not found")
    }
    if(order.paymentStatus==="PAID"){
        throw new Error("Payment already completed for this order")
    }
    const payment= await Payment.create({
        orderId:order._id,// changed (updated)
        amount:order.totalAmount,
        method,
        status:"PENDING",
        transcationId:generateTranscationId(),
    })

    return payment

}

const verifyPayment=async(orderId,success)=>{
const payment=await Payment.findOne({orderId});

if(!payment) {
    throw new Error("Payment record is not found");
}

const order=await Order.findById(orderId);

if(!order) {
    throw new Error("order not found");
}

if(success){
    payment.status="PAID",
    order.paymentStatus="PAID"
}else{
    payment.status="FAILED",
    order.paymentStatus="FAILED"
}

await payment.save();
await order.save()

return{
    payment,
    order
}
}
module.exports={initialPayment,verifyPayment}