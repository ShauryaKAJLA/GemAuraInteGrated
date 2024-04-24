import { configureStore } from "@reduxjs/toolkit";
import CartReducer from '../pages/cart/CartSlice'
import FilteredProductsReducer from "../products/FilteredProductsSlice";
import filterReducer from "../products/filterSlice";
import productListSlice from "../pages/productInfo/productListSlice";
export const store= configureStore({
    reducer:{
        cart:CartReducer,
        FilteredProducts: FilteredProductsReducer,
        filter:filterReducer,
        productInfo:productListSlice,
    }
}) 