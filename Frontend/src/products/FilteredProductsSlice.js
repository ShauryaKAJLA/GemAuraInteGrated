import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    AllProducts:[],
};

export const FilteredProductsSlice=createSlice({
    name:"FilteredProducts",
    initialState,
    reducers:{
      addProducts:(state,action)=>{
        state.AllProducts=[...action.payload];
        console.log(state.AllProducts)
    },
        changeProducts:(state,action)=>{
          const types=state.AllProducts.map(item=>item.type_of)
          const gem=state.AllProducts.map(item=>item.Gem.type)
          let metal=[]
          state.AllProducts.forEach(item=>{
           if(!metal.find(i=>i.toLowerCase()==item.metal.type.toLowerCase()))
            {
              metal.push(item.metal.type.toLowerCase())
            }
          }
          )
          console.log(metal)
            let pro=[...state.AllProducts];
            console.log(pro)
            console.log(action.payload)
            if(action.payload.gender!='All')
              {
                pro=pro.filter(i=>i.gender==action.payload.gender)
              }
              if(action.payload.Gem!='All')
              {
                pro=pro.filter(i=>i.Gem.type==action.payload.Gem)
              }
              if(action.payload.Metal!='All')
              {
                pro=pro.filter(i=>i.metal.type==action.payload.Metal)
              }
              
              if(action.payload.search!="All")
              {
                let dummy=pro.filter(item=>item)
                console.log(action.payload.search)
                console.log(types)
                if(action.payload.search.toLowerCase().includes('ladies')||action.payload.search.toLowerCase().includes('woman')||action.payload.search.toLowerCase().includes('women')||action.payload.search.toLowerCase().includes('womens')||action.payload.search.toLowerCase().includes('lady')||action.payload.search.toLowerCase().includes('girl')||action.payload.search.toLowerCase().includes('girls'))
                {
                    dummy=pro.filter(item=>item.gender=='w')
                }

          
                if((action.payload.search.toLowerCase().includes('men')&&!action.payload.search.toLowerCase().includes('women'))||(action.payload.search.toLowerCase().includes('man')&&!action.payload.search.toLowerCase().includes('woman'))||action.payload.search.toLowerCase().includes('boy')||action.payload.search.toLowerCase().includes('boys')||(action.payload.search.toLowerCase().includes('mens')&&!action.payload.search.toLowerCase().includes('womens'))||action.payload.search.toLowerCase().includes('gents')||action.payload.search.toLowerCase().includes('boys'))
                {
                    dummy=pro.filter(item=>item.gender=='m')
                }
                if(action.payload.search.toLowerCase().includes('kids')||action.payload.search.toLowerCase().includes('child')||action.payload.search.toLowerCase().includes('kid'))
                {
                  dummy=pro.filter(item=>item.gender=='k')
                }
               if(dummy.length!=0)
               pro=dummy.filter(item=>item)
                let temp="";
                types.forEach(item=>{
                  if(action.payload.search.toLowerCase().includes(item.toLowerCase())&&!types.find(i=>i.length>item.length&&action.payload.search.toLowerCase().includes(i.toLowerCase())))
                  {
                    dummy=dummy.filter(i=>i.type_of.toLowerCase()==item.toLowerCase())
                  }
                })
                if(dummy.length)
                pro=dummy.filter(item=>item.type_of.toLowerCase()==temp.toLowerCase());
               
                metal.forEach(item=>{
                  if(action.payload.search.toLowerCase().includes(item.toLowerCase())||item.toLowerCase().includes(action.payload.search.toLowerCase()))
                  {
                    dummy=dummy.filter(i=>i.metal.type.toLowerCase().includes(item.toLowerCase()))
                  }
                })
               
                pro=dummy.filter(item=>item)
                gem.forEach(item=>{
                  if(action.payload.search.toLowerCase().includes(item.toLowerCase())||item.toLowerCase().includes(action.payload.search.toLowerCase()))
                  {
                    dummy=pro.filter(i=>i.Gem.type.includes(item))
                  }
                })
              
                pro=dummy.filter(item=>item)

              }
            pro=pro.filter(item=>item.metal.pricePerGram*item.metal.weightInGram+item.Gem.totalPrice<=action.payload.price)
            state.products=pro
        },
       
    }
})
export const {searchProducts,changeProducts,addProducts}=FilteredProductsSlice.actions;
export default FilteredProductsSlice.reducer;