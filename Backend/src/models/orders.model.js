import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    status:{
      type:String,
      enum:["pending","completed"],
      default:"pending"
    },
    address:{
        type:String,
        required:true,
      },
      pincode:{
        type:String,
        required:true,
      },
      phoneNumber:{
          type:String,
          required:[true,"Phone Number is necessary"],
      }, 
      email: {
        type: String,
        required: [true, "Email field is necessary"],
      },
      totalQnt:{
        type:Number,
        required:true,
      },
    products:[
        {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            default :1
          },
          size:{
            type: Number , 
          },
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Orders=mongoose.model("Order",orderSchema);