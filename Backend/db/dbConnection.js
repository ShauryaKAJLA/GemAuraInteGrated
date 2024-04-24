const mongoose = require('mongoose')
const {mongoDB_URI} = require('../constants') 
const {CatagoriesData} = require('../data/categories.data')
const {productsData} = require('../data/products.data')
const Category = require('../models/categories.models')
const Product = require('../models/product.model')

async function connectWithDb(){
    try{
        const connectionDetails = await mongoose.connect(mongoDB_URI)

        //  seeding data for one time
        // await Category.insertMany(CatagoriesData)
        // await Product.insertMany(productsData)
    }catch(err){
        console.log("ERROR :",err.message)
    }
}

module.exports={connectWithDb}