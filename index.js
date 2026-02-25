const express=require("express");
const authRoutes = require("./routes/auth.Routes.js");
const restaurantRoutes = require("./routes/restaurant.routes.js");
const orderRoutes = require("./routes/order.Routes.js");
const paymentRoutes = require("./routes/payment.Route.js");
const menuRoutes = require("./routes/menu.Routes.js");
const cors=require("cors")
const app=express();
require("dotenv").config()
require("./config/db.js");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.get("/",(req,res)=>{
res.send("Hello")
})
app.use("/api/auth",authRoutes);
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payments",paymentRoutes)
app.use("/api/menuItems",menuRoutes)
// global error handling
app.use((err,req,res,next)=>{
    console.error(err.message);
    res.status(500).json({
        success:false,
        message:err.message || "Server Error"
    })
})

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server successfully running on http://localhost:${PORT}`)
})