import mongoose from "mongoose";
import { dbName } from "../../dbName.js";
const connectDB= async()=>{
try {
        const connectionInstance=     await mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`)
        console.log(`database is connected successfully at ${connectionInstance.connection.host}`);
        
} catch (error) {
    console.log(`error in database  connection!!: ${error}`) || process.exit(1)
    
}
}

export {connectDB}