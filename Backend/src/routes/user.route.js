import { Router } from 'express'
import {  addFeedback, addQuantity, addToCart, allCartItems, deleteCartItem, getProfile, loginUser, reduceQuantity, registerUser } from '../controllers/user.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'


const router=Router()

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/addFeedback').post(verifyJWT,addFeedback)
router.route('/addToCart').post(verifyJWT,addToCart)
router.route('/addQuantity').post(verifyJWT,addQuantity)
router.route('/reduceQuantity').post(verifyJWT,reduceQuantity)
router.route('/deleteItem').delete(verifyJWT,deleteCartItem)
router.route('/getAllCartItems').get(verifyJWT,allCartItems)
router.route('/getProfile').get(verifyJWT,getProfile)
export default router