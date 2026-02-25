const mongoose = require("mongoose");


const PaymentSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ["CARD", "UPI", "COD"],
        required: true
    },
    status: {
        type: String,
        enum: ["PAID", "PENDING", "FAILED"],
        default: "PENDING"
    },
    transcationId: {
        type: String,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("Payment", PaymentSchema)