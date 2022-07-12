import { createSlice } from '@reduxjs/toolkit'

const initialData = []

export const CartSlice = createSlice({
  name: 'cart',
  initialState:initialData,
  reducers: {
    add(state,action){
      const itemIndex = state.findIndex((item)=>item.id===action.payload.id)
      if(itemIndex >= 0){
       state[itemIndex].cartQuantity +=1;
      }
      else {
        const tempProduct = {...action.payload, cartQuantity:1}
        state.push(tempProduct)
      }

    },
    remove(state,action){
       return state.filter((item) => item.id !== action.payload)
    },
    // getCartTotal : (state) =>{}
  },
})

export const { add, remove } = CartSlice.actions

export default CartSlice.reducer