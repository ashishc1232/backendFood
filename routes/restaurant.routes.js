const express=require("express")
const restaurantRoutes=express.Router();
const {createRestaurant, getRestaurants}=require("../controllers/restaurant.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

restaurantRoutes.post("/",authMiddleware,roleMiddleware("ADMIN"),createRestaurant);
restaurantRoutes.get("/",getRestaurants)

module.exports=restaurantRoutes