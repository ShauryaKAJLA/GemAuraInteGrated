import mongoose from 'mongoose'
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
  username:{
    type:String ,
    required:true   
  },
  address:{
    type:String,
    default : "none"
  },
  phoneNumber:{
      type:String,
      required:[true,"Phone Number is necessary"],
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
  

});

userSchema.plugin(aggregatePaginate)
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect=async function(password){
return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id:this._id,
      username:this.username,
      email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.model("User", userSchema);
