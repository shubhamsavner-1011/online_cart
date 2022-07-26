import { createSlice } from '@reduxjs/toolkit'

const initialData = {
    productDetail: null
}

export const ProductDetailSlice = createSlice({
    name: 'productDetail',
    initialState: initialData,
    reducers: {
        productDetail(state, action) {
            const product = { ...action.payload }
            state.productDetail = product;
        },
    },
})

export const { productDetail } = ProductDetailSlice.actions



export default ProductDetailSlice.reducer