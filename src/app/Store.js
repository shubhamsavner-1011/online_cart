import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../Store/CartSlice'
import logger from "redux-logger";
const middleWares = [logger];


export const store = configureStore({
  reducer: {
    cart:CartReducer,
  },
  middleware: middleWares,
})