import { app } from "./app.js";
import connectDb from "./db/index.js";
import { Product } from "./models/product.model.js";
import { productsData } from "../data/products.data.js";
import { Category } from "./models/categories.models.js";
import { CatagoriesData } from "../data/categories.data.js";
connectDb().then(() => {
    console.log("Successfully connected to db")

})
    .catch(() => {
        console.log("failed to connect to db")
    })
app.listen(process.env.PORT, () => {
    console.log("Server is listening at port: ", process.env.PORT)


})
