import { createSlice } from "@reduxjs/toolkit";

const initialState={
    filter:{price:0,gender:"All",Gem:"All",Metal:"All",search:"All"}
}

export const filteSlice=createSlice({
    name:"filter",
    initialState,
    reducers:{
        changePrice:(state,action)=>{
           state.filter.price=action.payload;
        },
        changeGem:(state,action)=>{
           state.filter.Gem=action.payload;
        },
        changeMetal:(state,action)=>{
            state.filter.Metal=action.payload
        },
        changeGender:(state,action)=>{
            state.filter.gender=action.payload
        },
        changeSearch:(state,action)=>{
            state.filter.search=action.payload
        }
    }
})
export const {changeGem,changeGender,changeMetal,changePrice,changeSearch}=filteSlice.actions
export default filteSlice.reducer