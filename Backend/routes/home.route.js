const express = require('express')
const router = express.Router()
const User = require("../models/user.model");
const { tokenAuth } = require("../middlewares/tokenAuth");

router.use(express.json())

router.get('/',tokenAuth ,async(req,res)=>{
    try{
        const {user} = req
        const fetchedUser = await User.findById(user._id)
        if(!fetchedUser)
            return res.status(400).json({success: false , message : "User not found"})
        const cartSize = fetchedUser.cart.length
        return res.status(200).json({success:true , cartSize : cartSize}) 
    }catch(err){
        return res.status(400).json({success:false , message: err.message})
    }
})

module.exports = router