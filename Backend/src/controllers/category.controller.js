import { Category } from "../models/categories.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllCatagory=asyncHandler(async (req,res)=>{
    const catagory=await Category.find()
    return res.status(200).json(new apiResponse(200,catagory,"Catagory returned successfully"))
})

export {getAllCatagory}