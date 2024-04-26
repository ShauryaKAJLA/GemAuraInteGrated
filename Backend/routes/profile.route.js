const express = require('express')
const router = express.Router()
const {tokenAuth} = require('../middlewares/tokenAuth')
const User = require('../models/user.model')

router.use(express.json())

router.get('/',tokenAuth , async(req,res)=>{
    const {user} = req
    try{
    const fetchedUser = await User.findById(user._id)

    if(!fetchedUser)
        return res.status(500).json({success:false , message : "User not found"})

    
    console.log({fetchedUser})

    const details  = fetchedUser.toObject()
    details.password = undefined
    details.feedback = undefined
    details.currentOrders = undefined
    details.cart = undefined
    return res.status(200).json({success:true , userDetails :details})
    }catch(err){
        return res.status(400).json({success:false , message : err.message})
    }
})


module.exports = router