import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async() =>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }
    catch(error){
        console.log("ERROR : ", error);
        process.exit(1);
    }
}

export default connectDB;
