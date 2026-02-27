const express=require("express");
const authRoutes = require("./routes/auth.Routes.js");
const restaurantRoutes = require("./routes/restaurant.routes.js");
const orderRoutes = require("./routes/order.Routes.js");
const paymentRoutes = require("./routes/payment.Route.js");
const menuRoutes = require("./routes/menu.Routes.js");
const rateLimit=require("express-rate-limit")
const cors=require("cors")
const app=express();
require("dotenv").config();
require("./config/db.js");

app.use(cors({
    origin:[
      "http://localhost:5173",
      "https://verdant-jelly-b89609.netlify.app"
    ]
}))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Max 100 requests per IP per windowMs
  standardHeaders: 'draft-7', // Enable standard RateLimit headers (IETF)
  legacyHeaders: false, // Disable legacy X-RateLimit-* headers
  message: "Too many requests, please try again later." // Custom message
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
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


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});