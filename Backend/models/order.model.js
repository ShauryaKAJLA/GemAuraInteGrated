const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    quantity :{
        type : Number
    },
    price:{
        type: Number
    },
    addressDelivery:{
        type : String
    },
    status:{
        type:Number,
        enum :[1,0], // 1-> inProcess , 0-> pending
        default : 0
    },
    items : [{
        quantity : Number,
        size : Number , 
        product:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    }]
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order