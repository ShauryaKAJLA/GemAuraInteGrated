import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
    
    src:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})  


export const Category = mongoose.model('Category',categorySchema)
