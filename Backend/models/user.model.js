const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field is necessary"],
  },
  password: {
    type: String,
    required: [true, "Password field is necessary"],
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
      }
    }
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
