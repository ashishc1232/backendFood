const paymentService=require("../services/Payment.service.js")
// initialization
// verify 

const initialPayment=async(req,res,next)=>{
try {
  const {orderId,method}=req.body
  const payment=await paymentService.initialPayment(
    orderId,method
  )
  res.status(201).json({
    success:true,
    data:payment
  })
} catch (error) {
    next(error)
}
}

const verifyPayment=async(req,res,next)=>{
try {
    const {orderId,success}=req.body;
    const result=await paymentService.verifyPayment(
        orderId,success
    )
    res.status(200).json({
        success:true,
        data:result
    })
} catch (error) {
    next(error)
}
}
module.exports={initialPayment,verifyPayment}