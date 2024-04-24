import { createSlice } from "@reduxjs/toolkit";
import { products } from '../../data/products'
import { useDispatch } from "react-redux";
const initialState={
    productInfo:[]
}
export const productListSlice=createSlice({
    name:"ProductInfo",
    initialState,
    reducers:{
        setProductInfo:(state,action)=>{
            let fin=products.find(item=>item.id==action.payload.id)
            state.productInfo=fin
        },
        changeSize:(state,action)=>{
          state.productInfo.size=action.payload
          console.log(state.productInfo.size)
        },
    }
})
export const {setProductInfo,changeSize,sendToCart}=productListSlice.actions
export default productListSlice.reducer