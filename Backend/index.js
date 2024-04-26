const express = require('express')
const app= express()
require('dotenv').config()
const cors = require('cors')
const {connectWithDb} = require('./db/dbConnection')
const PORT= process.env.PORT || 5000

// importing routes
const CategoryRoute = require('./routes/categories.route')
const ProductRoute = require('./routes/products.route')
const AuthRoute = require('./routes/auth.route')
const CartRoute = require('./routes/cart.route')
const HomeRoute = require('./routes/home.route')
const FeedbackRoute = require('./routes/feedback.route')
const ProfileRoute = require('./routes/profile.route')
const OrderRoute = require('./routes/currentOrder.route')



app.use(cors())

connectWithDb()
.then(res => console.log("Successfully connected with Db "))
.catch(err=> console.log("Error occured while connecting with database !!"))

app.get('/',(req,res)=>res.send('this is home page'))


app.use('/categories',CategoryRoute)
app.use('/products',ProductRoute)
app.use('/auth',AuthRoute)
app.use('/cart',CartRoute)
app.use('/home',HomeRoute)
app.use('/feedback',FeedbackRoute)
app.use('/profile',ProfileRoute)
app.use('/currentOrder',OrderRoute)

app.listen(PORT,()=>{
    console.log("Backend initiated on PORT no. ",PORT)
})