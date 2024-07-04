import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express()


app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({limit:"20kb",extended:true}))
app.use(express.static("public"))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())
import userRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import catagoryRoute from './routes/catagory.route.js'

app.use('/users',userRoute)
app.use('/products',productRoute)
app.use('/catagory',catagoryRoute)

export {app}