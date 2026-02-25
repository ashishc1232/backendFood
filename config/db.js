const mongoose=require("mongoose");

const MongoURI=process.env.MONGO_URI
const connectDB=async()=>{
    try {
       await mongoose.connect(MongoURI)
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.log(error," :connection failed")
    }
}

connectDB()
