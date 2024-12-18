import { app } from "./app.js";
import connectDb from "./db/index.js";


connectDb().then(()=>{
    console.log("Successfully connected to db")
})
.catch(()=>{
    console.log("failed to connect to db")
})

app.listen(process.env.PORT,()=>{
    console.log("Server is listening at port: ",process.env.PORT)
})