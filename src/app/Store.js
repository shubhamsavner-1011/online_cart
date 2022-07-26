import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../Store/CartSlice'
import UserReducer from '../Store/UserSlice'
import { composeWithDevTools } from 'redux-devtools-extension';
import ProductDetailSlice from '../Store/ProductDetailSlice';


export const store = configureStore({
  reducer: {
    cart:CartReducer,
    user:UserReducer,
    product:ProductDetailSlice
  },
  composeWithDevTools
})