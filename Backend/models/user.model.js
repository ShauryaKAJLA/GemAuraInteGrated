const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username:{
    type:String ,
    default : "User"
  },
  phone: {
    type : String,
    default : "currently not set"    
  },
  address:{
    type:String,
    default : "none"
  },
  email: {
    type: String,
    required: [true, "Email field is necessary"],
  },
  password: {
    type: String,
    required: [true, "Password field is necessary"],
  },
  passwordLength:{
    type:Number,
    default:0
  },
  cart: [
    {
      product: {
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
  feedback:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Feedback"
  }],
  currentOrders:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Order",
    default : []
  }],
  

});

const User = mongoose.model("User", userSchema);
module.exports = User;