import  { Router } from 'express'
import { getAllCatagory } from '../controllers/category.controller.js'


const router=Router()

router.route('/getAllCatagory').get(getAllCatagory)


export default router