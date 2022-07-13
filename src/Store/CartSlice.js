import { createSlice } from '@reduxjs/toolkit'

const initialData = {
  cartItem:[],
  cartTotalAmount:0,
  cartTotalQuantity:1,
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState:initialData,
  reducers: {
    add(state,action){
      const itemIndex = state.cartItem.findIndex((item)=>item.id===action.payload.id)

      if(itemIndex >= 0){
       state.cartItem[itemIndex].cartQuantity +=1;
      }
      else {
        const tempProduct = {...action.payload, cartQuantity:1}
        state.cartItem.push(tempProduct)
      }

    },
    remove : (state,action) =>{
      //  return state.cartItem.filter((item) => item.id !== action.payload)
      state.cartItem = state.cartItem.filter(item=>item.id!==action.payload)

    },
    AllClear : (state) =>{
      state.cartItem = []
    },
    increment: (state,action) =>{
     const itemIndex  = state.cartItem.findIndex(cartItem=>cartItem.id===action.payload)
        state.cartItem[itemIndex].cartQuantity+=1
        
    },

    decrement:(state,action)=>{
      const itemIndex = state.cartItem.findIndex(cartItem=>cartItem.id===action.payload)
      if(state.cartItem[itemIndex].cartQuantity>1){
        state.cartItem[itemIndex].cartQuantity-=1
      }
      else{
        state.cartItem = state.cartItem.filter(item=>item.id!==action.payload)
      }
    },
    
    
  },
})

export const { add, AllClear, remove,increment, decrement} = CartSlice.actions

export default CartSlice.reducer