
import {Server} from "http"
import mongoose from "mongoose"
import app from "./app"
import { envVars } from "./app/config/env"
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin"


let server:Server



const startServer=async()=>{
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log('connected to DB ');
        server=app.listen(5000,()=>{
            console.log('server is Listening a port 5000');
        })
    } catch (error) {
        console.log(error);
    }

}
startServer()
seedSuperAdmin()

process.on('unhandledRejection',()=>{
    console.log('Unhandled Rejection');
    if (server) {
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// process.on('uncaughtException',()=>{
//     console.log('uncaughtException Rejection');
//     if (server) {
//         server.close(()=>{
//             process.exit(1)
//         })
//     }
//     process.exit(1)
// })


// Promise.reject(new Error("I forgot to catch this promise"))

