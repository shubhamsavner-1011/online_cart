import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../Store/CartSlice'
import logger from "redux-logger";
import IncrementReducer from '../Store/CountSlice';
const middleWares = [logger];


export const store = configureStore({
  reducer: {
    cart:CartReducer,
    increment:IncrementReducer
  },
  middleware: middleWares,
})