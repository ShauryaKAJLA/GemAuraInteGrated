const express = require('express')
const router = express.Router()
const {tokenAuth} = require('../middlewares/tokenAuth')
const User = require('../models/user.model')
const Order = require('../models/order.model')

router.use(express.json())


router.post('/add',tokenAuth,async(req,res)=>{

    const {user} = req;
    const {order} = req.body

    try{
        const fetchedUser = await User.findById(user._id)
        if(!fetchedUser)
            return res.status(400).json({success:false, message : "User not found"})
        
        const orderObjectToSave = {...order , items : order.items.map(item => ({...item , product : item.product._id}))}
        // console.log(orderObjectToSave.items)
        const newOrderObject = await Order.create({...orderObjectToSave})

        fetchedUser.currentOrders.push(newOrderObject._id)
        fetchedUser.address = order.addressDelivery
        await newOrderObject.save()

        fetchedUser.cart =[]
        await fetchedUser.save();

        const newOrder = newOrderObject
   
        return res.json({success:true , order:newOrder})
        
    }catch(err){
        return res.status(500).json({success:false , message :err.message})
    }
})

router.get('/',tokenAuth , async(req,res)=>{
    const {user}= req
    
    try{
        const fetchedUser = await User.findById(user._id).populate({
            path : 'currentOrders',
            
            populate :{
                path : 'items',
                populate : 'product'
            }
        })

        if(!fetchedUser)
            return res.status(400).json({success:false, message : "User not found"})

        const currentOrders = fetchedUser.currentOrders

        return res.json({success:true ,currentOrders})
        
    }catch(err){
        return res.status(500).json({success:false , message :err.message})
    }

})


module.exports = router