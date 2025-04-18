import mongoose from "mongoose";

export const connectToDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connect to : ",conn?.connection?.host);
        
    } catch (error) {
        console.log(error.message || error);
        process.exit(1);
    } 
};