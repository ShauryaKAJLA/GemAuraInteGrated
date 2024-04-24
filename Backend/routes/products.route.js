const express = require('express')
const router=express.Router()
const Product = require('../models/product.model')

router.use(express.json()); 

router.get('/',async(req,res)=>{
    try{
        const data = await Product.find({})
        res.status(200).json({success:true , products:data })
    }catch(err){
        console.log(err)
        res.status(422).json({success:false , message:err.message})
    }
})


router.get('/carousel',async(req,res)=>{
    try{
        const data = await Product.find({}).limit(6)
        res.status(200).json({success:true , products:data })
    }catch(err){
        console.log(err)
        res.status(422).json({success:false , message:err.message})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const data = await Product.findById(id)
        data.__v=undefined;
        return res.json({success:true , product : data})
    }catch(err){
        return res.status(422).json({success:false , message:err.message})
    }
})



module.exports = router
