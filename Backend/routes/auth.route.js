const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {getToken} = require('../utils/getToken')
router.use(express.json()); 


router.post('/signup',async(req,res)=>{
    const {data:{email,password}} = req.body
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({success:false , message:"User already exists"})
        }
   
        const hashedPassword = await bcrypt.hash(password , 10)
        const newUser = await User.create({email,password:hashedPassword})
        const userDetailsToReturn  = {...newUser , password:undefined ,__v:undefined}

        return res.status(200).json({success:true , user:userDetailsToReturn})

    }catch(err){
        return res.status(422).json({success:false , message:err.message})
    }

    
})


router.post('/login',async(req,res)=>{
    const {data : {email:user_email,password}} = req.body
    console.log(user_email , password)
    try{
        const user = await User.findOne({email:user_email})
        if(!user)
            return res.status(401).json({success:false , message: "Invalid Credentials"})

        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(!isPasswordValid)
            return res.status(401).json({success:false , message: "Invalid Credentials"})
 
        const token =  getToken(user)
        
        const userDetailsToReturn = {...user.toJSON(),password:undefined , __v:undefined,token}
        console.log(userDetailsToReturn)
        return res.status(200).json({success:true , user:userDetailsToReturn})    
            
    }catch(err){
        return res.status(422).json({success:false , message:err.message })
    }
})



module.exports = router