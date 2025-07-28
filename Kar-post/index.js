import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
const port= process.env.PORT


connectDB().then(
    ()=>{
    app.listen(port,()=>{
        console.log(`server is running on ${port}`);
        
    });
    }
)