const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { tokenAuth } = require("../middlewares/tokenAuth");
const Product =  require('../models/product.model')

router.use(express.json());

// to add items to cart
router.post("/add", tokenAuth, async (req, res) => {
  const { user } = req;
  const { productId, size } = req.body;
//   console.log(size);
  try {
    let fetchedUser = await User.findById(user._id).populate({
      path : 'cart',
      populate: ({
        path : 'product'
      })
    });
    if (!fetchedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found !!" });
    }
    const productToBeAdded = await Product.findById(productId)
    console.log(productToBeAdded)
    const productIndexInCart = fetchedUser.cart.findIndex((cartItem) => {
      return cartItem.product._id == productId && cartItem.size == size;
    });
    // console.log(productIndexInCart);
    let newCart = [];
    // console.log((type ==='Ring'||type ==='ring'))

    if (productIndexInCart !== -1) {
    //   console.log("mil gya ...");
      newCart = fetchedUser.cart.map((cartItem) => {
        if (cartItem.product._id == productId && cartItem.size == size) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
    } else {
      // console.log(fetchedUser.cart)
      newCart = [
        ...fetchedUser.cart,
        { product: productToBeAdded, size: size !== undefined ? size : undefined },
      ];
    }
    fetchedUser.cart = newCart;
    // fetchedUser.size = size
    await fetchedUser.save();
    newCart = fetchedUser.toObject(newCart).cart // to convert to plain object from mongoose document
    const updatedCartItem = newCart.find(item => item.product._id.equals(productId) && item.size == size)
    
    return res.status(200).json({ success: true, cart: newCart , updatedCartItem });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// to get all items in cart
router.get("/", tokenAuth, async (req, res) => {
  const { user } = req;
  try {
    const fetchedUser = await User.findById(user._id).populate({
      path: "cart",
      populate: {
        path: "product",
      },
    }).lean();
    // console.log({ fetchedUser });

    return res.status(200).json({ success: true, cart: fetchedUser.cart });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// to remove item from cart
router.post("/remove", tokenAuth, async (req, res) => {
  const { user } = req;
  const { productId, size } = req.body;
//   console.log(productId, size);
  try {
    const fetchedUser = await User.findById(user._id);
    if (!fetchedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // console.log(item.product._id, productId, item.size, size);
    // console.log({cart : fetchedUser.cart})
    const newCart = size===undefined ?
    fetchedUser.cart.filter(
        (item) =>
          item.product != productId 
      )
      :
    fetchedUser.cart.filter(
        (item) =>
        {   
            if(item.product == productId && item.size == size)
                return false 
            else    
                return true
        }
      )

    fetchedUser.cart = newCart;

    await fetchedUser.save();
    return res.status(200).json({ success: true, cart: newCart });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// to reduce quantity
router.post("/reduce", tokenAuth, async (req, res) => {
  const { user } = req;
  const { productId, size } = req.body;
  try {
    const fetchedUser = await User.findById(user._id).populate({
      path : 'cart',
      populate: ({
        path : 'product'
      })
    });

    if (!fetchedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" })
    }
    const productToBeUpdated = await Product.findById(productId)
    const currentQuantity = fetchedUser.cart.find(item => item.product._id == productId && item.size == size).quantity
    // console.log(currentQuantity)
    
    let newCart =[]
    if(currentQuantity > 1){
        newCart = fetchedUser.cart.map(item => (item.product._id == productId && item.size == size )? ({...item , quantity : item.quantity-1 }) : item)
    }else{
        newCart = fetchedUser.cart.filter(item => (!(item.product._id == productId && item.size == size )))
    }
    fetchedUser.cart = newCart;
    await fetchedUser.save();
    newCart = fetchedUser.toObject(newCart).cart
    const updatedCartProduct = newCart.find(item =>  item.product._id == productId && item.size == size)
    
    return res.status(200).json({ success: true, cart: newCart , updatedCartProduct});
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;