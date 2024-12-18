import { Router } from 'express'
import {  addAddress, addFeedback, addQuantity, addToCart, allCartItems, changeEmail, changePassword, changePhone, changeUsername, deleteAddress, deleteCartItem, getProfile, handleGetOrders, loginUser, logoutUser, placeOrder, reduceQuantity, registerUser } from '../controllers/user.controller.js'
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
router.route('/changeUsername').post(verifyJWT,changeUsername)
router.route('/changePhoneNumber').post(verifyJWT,changePhone)
router.route('/changeEmail').post(verifyJWT,changeEmail)
router.route('/changePassword').post(verifyJWT,changePassword)
router.route('/deleteAddress').post(verifyJWT,deleteAddress)
router.route('/getOrders').post(verifyJWT,handleGetOrders)
export default router