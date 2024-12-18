
import { Feedback } from '../models/feedback.model.js'
import { Orders } from '../models/orders.model.js'
import { Product } from '../models/product.model.js'
import { User } from '../models/user.model.js'
import { apiError } from '../utils/apiError.js'
import {apiResponse} from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const registerUser=asyncHandler(async (req,res)=>{
    const username=req.body.data?.username||null
    const phoneNumber=req.body.data?.phoneNumber||null
    const email=req.body.data?.email||null
    const password=req.body.data?.password||null
        if(!username && username?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"Username is required"))
        }
        if(!email &&email?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"Email is required"))
        }
        if(!phoneNumber && phoneNumber?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"Phone Number is required"))
        }
        if(!password || password?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"Password is required"))
        }
        const existedUser=await User.findOne({email:email})
        if(existedUser)
        {
            return res.status(400).json(new apiError(400,"User already exists with this email"))
        }
        const registerUser=await User.create({
            username,email,phoneNumber,password,passwordLength:password.length,address:[]
        })
        const user=await User.findById(registerUser._id).select("-password -cart -feedback -currentOrders -address")
        if(!user)
        {
            return res.status(500).json(new apiError(500,"There was a problem while registering the user"))
        }
        return res.status(200).json(new apiResponse(200,{},"user was registered"))

})

const loginUser=asyncHandler(async (req,res)=>{
    const email=req.body.data?.email||null
    const password=req.body.data?.password||null
    if(!email || email?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"email is required"))
        }
    if(!password || password?.trim()=="")
        {
            return res.status(400).json(new apiError(400,"Password is required"))
        }
        const existedUser=await User.findOne({email})
        if(!existedUser)
            {
                return res.status(400).json(new apiError(400,"No user found with this email"))
            }

            const checkPasswordCorrect =await existedUser.isPasswordCorrect(password)
            if(!checkPasswordCorrect)
                {
                    return res.status(400).json(new apiError(400,"Password is incorrect"))
                }
                const user=await User.findById(existedUser._id).select("-password -cart -feedback -currentOrders -address")
                const accessToken=user.generateAccessToken()
                const options={
                    httpOnly:true,
                    secure:true,
                    }
            return res.status(200).cookie("isLoggedIn",true).cookie("accessToken",accessToken,options).json(new apiResponse(200,{user,accessToken},"User was logged in successfully"))

})

const logoutUser=asyncHandler(async (req,res)=>{
    console.log("hello")
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200).clearCookie("isLoggedIn").clearCookie("accessToken",options).json(new apiResponse(200,{},"User was logout successfully"))
})

const addFeedback=asyncHandler(async (req,res)=>{
    const name=req.body?.data?.name 
    const email=req.body?.data?.email 
    const message=req.body?.data?.message 
    if(!email || email?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"Email is required"))
    }
    if(!name || name?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"name is required"))
    }
    if(!message || message?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"message is required"))
    }

    const newFeedback=await Feedback.create({
        name,email,message,givenBy:req.user._id
    })
    if(!newFeedback)
        {
            return res.status(500).json(new apiError(500,"There was a problem while uploading the feedback"))
        }
        return res.status(200).json(new apiResponse(200,newFeedback,"Feedback was submitted successfully"))

})

const addToCart=asyncHandler(async (req,res)=>{
    const productId=req.body?.data?.productId 
    const size=req.body?.data?.size 
    if(!productId || productId?.trim()=="")
    {
        return res.status(400).json(new apiError(400,"ProductId is required"))
    }
    const findUser=await User.findById(req.user._id)
    let _id="";
    if(size)
    {
        if(findUser.cart.some(item=>item.product==productId && item.size==size))
            {
                findUser.cart=findUser.cart.map(item=>(item.product==productId) && (item.size==size)?{...item,quantity:item.quantity+1}:item)
                
            }
            else
            {
                findUser.cart.push({product:productId,quantity:1,size})
            }
    }
    else
    {
        if(findUser.cart.some(item=>item.product==productId))
            {
                findUser.cart=findUser.cart.map(item=>item.product==productId?{...item,quantity:item.quantity+1}:item)
            }
            else
            {
                findUser.cart.push({product:productId,quantity:1})
            }
    
    }
    const updatedUser=await findUser.save({ validateBeforeSave: false })
   
    const Item=updatedUser.cart.find(item=>(item.product==productId)&&((size&&item.size)?(item.size==size):true))
    const product=await Product.findById(productId)
    Item.product=product
    if(size)
    return res.status(200).json(new apiResponse(200,Item,"Product was added to cart"))
    return res.status(200).json(new apiResponse(200,Item,"Product was added to cart"))

})

const addQuantity=asyncHandler(async (req,res)=>{
    const itemId=req.body?.data?.itemId 
    if(!itemId)
    {
        return res.status(400).json(new apiError(400,"Cart item id is required"))
    }
    const user=await User.findById(req.user._id)
    user.cart=user.cart.map(item=>item._id==itemId?{...item,quantity:item.quantity+1}:item)
    await user.save();
    return res.status(200).json(new apiResponse(200,{},"Quantity added successfully"))
})

const reduceQuantity=asyncHandler(async (req,res)=>{
    const itemId=req.body?.data?.itemId 
    if(!itemId)
    {
        return res.status(400).json(new apiError(400,"Cart item id is required"))
    }
    const user=await User.findById(req.user._id)
    user.cart=user.cart.map(item=>item._id==itemId?{...item,quantity:item.quantity-1}:item)
    user.cart=user.cart.filter(item=>(item.quantity>0))
    await user.save();
    return res.status(200).json(new apiResponse(200,{},"Quantity reduced successfully"))
})

const deleteCartItem=asyncHandler(async (req,res)=>{
    const itemId=req.body?.data?.itemId 
    if(!itemId)
    {
        return res.status(400).json(new apiError(400,"Cart item id is required"))
    }
    const user=await User.findById(req.user._id)
    user.cart=user.cart.filter(item=>item._id!=itemId)
    await user.save();
    console.log("I worked perfect")
    return res.status(200).json(new apiResponse(200,{},"item deleted successfully"))
})

const allCartItems=asyncHandler(async (req,res)=>{
    try {
        const user=await User.findById(req.user._id).populate("cart.product")
        return res.status(200).json(new apiResponse(200,user.cart,"Cart returned successfully"))
    } catch (error) {
        return res.status(500).json(new apiError(500,"There was problem while returning the cart"))
    }   

})

const getProfile=asyncHandler(async(req,res)=>{
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

const addAddress=asyncHandler(async (req,res)=>{
    const newAddress= req.body?.data?.newAddress?req.body.data.newAddress:NULL;
    if(!newAddress||newAddress?.trim()==="")
    {
        return res.status(400).json(new apiResponse(400,{},"Address is required"))
    }
   const user= await User.findById(req.user.id)
    user.address.push(newAddress)
    await user.save();
    return res.status(200).json(new apiResponse(200,newAddress,"new address added"))
})

const placeOrder=asyncHandler(async (req,res)=>{
    const name= req.body?.data?.name?req.body.data.name:null;
    const address= req.body?.data?.address?req.body.data.address:null;
    const pincode= req.body?.data?.pincode?req.body.data.pincode:null;
    const phoneNumber= req.body?.data?.phoneNumber?req.body.data.phoneNumber:null;
    const email= req.body?.data?.email?req.body.data.email:null;
    const totalPrice= req.body?.data?.totalPrice?req.body.data.totalPrice:null;

    if(!name)
    {
        return res.status(400).json(new apiError(400,"Name is Required"))
    }
    if(!address)
    {
        return res.status(400).json(new apiError(400,"Address is Required"))
    }
    if(!pincode)
    {
        return res.status(400).json(new apiError(400,"Pincode is Required"))
    }
    if(!phoneNumber)
    {
        return res.status(400).json(new apiError(400,"Phone number is Required"))
    }
    if(!email)
    {
        return res.status(400).json(new apiError(400,"Email is Required"))
    }
    if(!totalPrice)
    {
        return res.status(400).json(new apiError(400,"Total price is Required"))
    }

    try 
    {
        const user=await User.findById(req.user._id)
        let totalQnt=0;
        user.cart?.forEach(item=>{totalQnt+=item.quantity})
        await  Orders.create({
            user,name,address,pincode,phoneNumber,email,products:user.cart,totalPrice,totalQnt
        })
        user.cart=[];
        await user.save();
        return res.status(200).json(new apiResponse(200,{},"Order was placed"))
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json(new apiError(500,"Problem while placing order",error))
    }
})

const changeUsername=asyncHandler(async (req,res)=>{
    const username=req.body?.data?.username?req.body.data.username:null;
    if(!username)
    {
        return res.status(400).json(new apiError(400,"Username is required"))
    }
    try {
        const exists=await User.findOne({username});
        if(exists)
        {
            return res.status(400).json(new apiError(400,"User exists with this Username"))
        }
        await User.findByIdAndUpdate(req.user.id,{
            $set:{
                username
            }
        })
        return res.status(200).json(new apiResponse(200,{},"Updated successfully"))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiError(500,{},"There was a problem while updating username try again after some time"))
    }
})

const deleteAddress=asyncHandler(async (req,res)=>{
    const index=req.body?.data?.index!=null?req.body.data.index:null;
    console.log(index)
    if(index==null)
    {
        return res.status(400).json(new apiError(400,"Invalid request"))
    }
    try {
        const user=await User.findById(req.user._id);
        user.address=user.address.filter((_,i)=>i!=index)
        await user.save();
        return res.status(200).json(new apiResponse(200,{},"Deleted successfully"))
    } catch (error) {
        return res.status(500).json(new apiError(500,"There was a problem while deleting the address"))
    }
})

const changePhone=asyncHandler(async (req,res)=>{
    const phone=req.body?.data?.phone?req.body.data.phone:null;
    if(!phone)
    {
        return res.status(400).json(new apiError(400,"Phone Number is required"))
    }
    try {
        const exists=await User.findOne({phoneNumber:phone});
        if(exists)
        {
            return res.status(400).json(new apiError(400,"User exists with this Phone Number"))
        }
        await User.findByIdAndUpdate(req.user.id,{
            $set:{
                phoneNumber:phone
            }
        })
        return res.status(200).json(new apiResponse(200,{},"Updated successfully"))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500,{},"There was a problem while updating Phonenumber try again after some time"))
    }
})

const changeEmail=asyncHandler(async (req,res)=>{
    const email=req.body?.data?.email?req.body.data.email:null;
    if(!email)
    {
        return res.status(400).json(new apiError(400,"Email is required"))
    }
    try {
        const exists=await User.findOne({email});
        if(exists)
        {
            return res.status(400).json(new apiError(400,"User exists with this Email"))
        }
        await User.findByIdAndUpdate(req.user.id,{
            $set:{
                email
            }
        })
        return res.status(200).json(new apiResponse(200,{},"Updated successfully"))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500,{},"There was a problem while updating email try again after some time"))
    }
})

const changePassword=asyncHandler(async (req,res)=>{
    const password=req.body?.data?.password?req.body.data.password:null;
    if(!password)
    {
        return res.status(400).json(new apiError(400,"Password is required"))
    }
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $set:{
                password
            }
        })
        return res.status(200).json(new apiResponse(200,{},"Updated successfully"))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new apiResponse(500,{},"There was a problem while updating username try again after some time"))
    }
})


const handleGetOrders=asyncHandler(async (req,res)=>{
    try {
        const orders=await Orders.find({user:req.user._id}).populate("products.product")
        return res.status(200).json(new apiResponse(200,orders,"Orders were returned successfully"));
    } catch (error) {
        return res.status(400).json(new apiError(400,"There was a problem while returning the orders"));
    }
    
})

export {registerUser,loginUser,addFeedback,addToCart,addQuantity,reduceQuantity,deleteCartItem,allCartItems,getProfile,logoutUser,addAddress,placeOrder,changeUsername,changeEmail,changePassword,changePhone,deleteAddress,handleGetOrders}