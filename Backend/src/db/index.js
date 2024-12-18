import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import { productsData } from '../../data/products.data.js'
import { CatagoriesData } from '../../data/categories.data.js'
import { admin } from '../models/admin.model.js'
const connectDb=async ()=>{
    try {
        
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongo db connection successfull : "+connectionInstance.connection.host)
     
        // await Category.insertMany(CatagoriesData)
        // await Product.insertMany(productsData)
        
    } catch (error) {

        console.log("mongo db connection failed: "+error)
        return null;
    }
}
export default connectDb