import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState={
    cart:[]
}
export const CartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        userCart:(state,action)=>{
            state.cart=action.payload.filter(item=>item);
            console.log(state.cart)
        }
        ,
        addToCart: (state, action) => {
           
              if(state.cart.find(item=>item._id==action.payload._id))
              {

                state.cart=state.cart.map(item=>item._id==action.payload._id?{...item,quantity:item.quantity+1}:item)

                // if(!action.payload.hasOwnProperty('size'))
                //   state.cart=state.cart.filter(item=>item._id==action.payload._id?[item,item.quantity+=1]:item)
                // else
                // {
                //     if(state.cart.find(item=>(item._id==action.payload._id&&item.size==action.payload.size)))
                //     {
                //         state.cart=state.cart.filter(item=>(item._id==action.payload._id&&item.size==action.payload.size)?[item,item.quantity+=1]:item)
                //     }
                //     else
                //     {
                //     let newitem= {
                //         product:{
                //             _id:action.payload.product._id,
                //             name:action.payload.product.name,
                //             desc:action.payload.product.desc,
                //             metal:action.payload.product.metal,
                //             Gem:action.payload.product.Gem,
                //             type_of:action.payload.product.type_of,
                //             images:action.payload.product.images,
                //             inStock:action.payload.product.inStock,
                //         },
                //         _id:action.payload._id,
                //         quantity:1,
                //         size:action.payload.size
                //     }
                //      state.cart.push(newitem);
                //     }
                // }
               
            }
        // adds
                else
                {
                    if(action.payload.hasOwnProperty("size"))
                    {
                        let newitem= {
                            product:{
                                _id:action.payload.product._id,
                                name:action.payload.product.name,
                                desc:action.payload.product.desc,
                                metal:action.payload.product.metal,
                                Gem:action.payload.product.Gem,
                                type_of:action.payload.product.type_of,
                                images:action.payload.product.images,
                                inStock:action.payload.product.inStock,
                            },
                                _id:action.payload._id,
                                size:action.payload.size,
                                quantity:1,
                        }
                         state.cart.push(newitem);
                    }
                    else{
                    let newitem= {
                        product:{
                            _id:action.payload.product._id,
                            name:action.payload.product.name,
                            desc:action.payload.product.desc,
                            metal:action.payload.product.metal,
                            Gem:action.payload.product.Gem,
                            type_of:action.payload.product.type_of,
                            images:action.payload.product.images,
                            inStock:action.payload.product.inStock,
                        },
                        _id:action.payload._id,
                            quantity:1,
                    }
                     state.cart.push(newitem);
                }
                }
              
            
          },
        addQuantity : (state,action)=>{
            console.log("hello")
             state.cart=state.cart.map(item=>item._id==action.payload._id?{...item,quantity:item.quantity+1}:item)
           },
        reduceQuantity : (state,action)=>{
            state.cart=state.cart.map(item=>item._id==action.payload._id?{...item,quantity:item.quantity-1}:item)
           state.cart=state.cart.filter(item=>item.quantity>0)
        },
        removeItem : (state,action)=>{
            state.cart=state.cart.filter(item=>item._id!=action.payload._id)
        },
    }
})

export const {addToCart,addQuantity,reduceQuantity,removeItem,userCart} = CartSlice.actions
export default CartSlice.reducer