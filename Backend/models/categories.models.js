const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    src:String,
    name:String
})  


const Category = mongoose.model('Category',categorySchema)

module.exports=Category