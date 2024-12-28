import mongoose from "mongoose";

export const connectMongoDB = async() => {
    try{
       // console.log("process.env.MONGODB_URL>> ", process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Error connectiong to mongoDB", error)

    }
}