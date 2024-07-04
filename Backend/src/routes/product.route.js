import  { Router } from 'express'
import { getAllProducts, getSampleProducts, getSpecificProduct } from '../controllers/product.controller.js'


const router=Router()

router.route('/getAllProducts').get(getAllProducts)
router.route('/getSampleProducts').get(getSampleProducts)
router.route('/getProductInfo/:proId').get(getSpecificProduct)
export default router