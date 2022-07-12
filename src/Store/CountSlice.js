import { createSlice } from '@reduxjs/toolkit'

const initialData = {
  count:1
}

export const CountSlice = createSlice({
  name: 'increment',
  initialState:initialData,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
     if(state.count>1){
      state.count -= 1
     }
      
    },  
  },
})

export const {increment, decrement} = CountSlice.actions

export default CountSlice.reducer