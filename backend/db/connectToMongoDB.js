import mongoose from "mongoose";
import logger from "../logger/logger.js"

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        logger.info("Connected to MongoDB")
    } catch (error) {
        logger.error(`Error connecting to MongoDB ${error.message}`)
    }
}

export default connectToMongoDB;