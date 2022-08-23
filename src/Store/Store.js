import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './CartSlice'
import UserReducer from './UserSlice'
import { composeWithDevTools } from 'redux-devtools-extension';
import ProductDetailSlice from './ProductDetailSlice';


export const store = configureStore({
  reducer: {
    cart:CartReducer,
    user:UserReducer,
    product:ProductDetailSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  composeWithDevTools
})