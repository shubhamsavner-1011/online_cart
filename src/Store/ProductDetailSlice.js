import { createSlice } from '@reduxjs/toolkit'

const initialData = {
    productDetail: null,
    products: []
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
        }
    },
})

export const { productDetails, productss } = ProductDetailSlice.actions



export default ProductDetailSlice.reducer