const express = require('express')
const router=express.Router()
const Category = require('../models/categories.models')



router.get('/',async(req,res)=>{
    try{
        const data = await Category.find({})
        res.json({success:true , categories:data})
    }catch(err){
        console.log(err)
        res.json({succcess:false , message:err.message})
    }
})



module.exports = router
