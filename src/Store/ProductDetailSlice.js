import { createSlice } from '@reduxjs/toolkit'

const initialData = {
    productDetail: null,
    products: [],
    photo:''
}

export const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState: initialData,
    reducers: {
        productDetails:(state, action) => {
            
            state.productDetail = action.payload;
        },
        productss:(state, action) => {
            state.products = action.payload;
        },
        photoURL:(state,action) => {
            state.photo = action.payload;
        }
    },
})

export const { productDetails, productss,photoURL } = ProductDetailSlice.actions



export default ProductDetailSlice.reducer