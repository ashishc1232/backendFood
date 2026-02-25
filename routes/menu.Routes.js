const express=require("express");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { createMenuItem, getMenuItem } = require("../controllers/menuItem.Controller");

const menuRoutes=express.Router();


menuRoutes.post("/",authMiddleware,roleMiddleware("ADMIN"),createMenuItem);
menuRoutes.get("/restaurant/:restaurantId",getMenuItem);
module.exports=menuRoutes