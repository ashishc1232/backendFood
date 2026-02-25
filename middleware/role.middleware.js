const roleMiddleware=(requireRole)=>{
return (req,res,next)=>{
if(req.user.role!==requireRole){
    return res.status(403).json({message:"Access Denied"});
}
next()
}
}
module.exports=roleMiddleware;


// router.get("/",roleMiddleware("ADMIN"))