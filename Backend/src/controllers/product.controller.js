import { Product } from "../models/product.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllProducts=asyncHandler(async (req,res)=>{
    const Products=await Product.find()
    return res.status(200).json(new apiResponse(200,Products,"products returned successfully"))
})

const getSampleProducts=asyncHandler(async (req,res)=>{
    const Products=await Product.aggregate([
        {
            $match:{}
        },
        {
            $limit:10
        }
    ])
    return res.status(200).json(new apiResponse(200,Products,"Sample Products returned successfully"))
})

const getSpecificProduct=asyncHandler( async (req,res)=>{
    const {proId}=req.params
    const product=await Product.findById(proId)
    if(!product)
        {
            return res.status(400).json(new apiError(400,"Product was not found"))
        }
        return res.status(200).json(new apiResponse(200,product,"Product returned successfully"))
})
export {getAllProducts,getSampleProducts,getSpecificProduct}