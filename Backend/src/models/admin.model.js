import mongoose from "mongoose";


const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email is already used"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }

})

export const Admin=mongoose.model("admin",adminSchema)
