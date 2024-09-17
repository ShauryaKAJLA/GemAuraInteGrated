import { Router } from 'express'
import {  addAddress, addFeedback, addQuantity, addToCart, allCartItems, deleteCartItem, getProfile, loginUser, logoutUser, placeOrder, reduceQuantity, registerUser } from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'


const router=Router()

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser) 
router.route('/logoutUser').post(logoutUser) 
router.route('/addFeedback').post(verifyJWT,addFeedback)
router.route('/addToCart').post(verifyJWT,addToCart)
router.route('/addQuantity').post(verifyJWT,addQuantity)
router.route('/reduceQuantity').post(verifyJWT,reduceQuantity)
router.route('/deleteItem').delete(verifyJWT,deleteCartItem)
router.route('/getAllCartItems').get(verifyJWT,allCartItems)
router.route('/getProfile').get(verifyJWT,getProfile)
router.route('/addAddress').post(verifyJWT,addAddress)
router.route('/placeOrder').post(verifyJWT,placeOrder)
export default router