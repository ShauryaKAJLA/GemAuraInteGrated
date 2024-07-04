import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'


const verifyJWT=asyncHandler(async (req,res,next)=>{
    try {
        console.log("Mujhe kyu chlaya")
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(req.cookies)
        if(!token)
            {
                return res.status(400).json(new apiError(400,"Token not found"))
            }
            const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
          
            if(!decodedToken)
            {
                return res.status(400).json(new apiError(400,"Unauthorized Access"))
            }
            const user=await User.findById(decodedToken._id).select("-password -cart -feedback -currentOrders")
      
            if(!user)
                {
                    return res.status(400).json(new apiError(400,"Unauthorized Access"))
                }
            req.user=user
            next();
            
    } catch (error) {
        return res.status(400).json(new apiError(400,error.message))
    }
})
export default verifyJWT
