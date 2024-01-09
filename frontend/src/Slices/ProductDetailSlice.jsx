// User can easily -> Get details of any product

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    loading:false,
    product: {},
    error: null,
}

export const getProductDetails = createAsyncThunk('productDetails/getProductDetails',
async (id, { dispatch }) => {
    try {
        dispatch(productDetailRequest());

        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);

        dispatch(productDetailSuccess(data.product));
    } catch (error) {
        dispatch(productDetailFail(error.response.data.message));
    }
}
);

const productDetailSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        productDetailRequest: (state) => {
            state.loading = true;
        },
        productDetailSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    productDetailRequest, productDetailSuccess, productDetailFail, clearErrors
} =  productDetailSlice.actions; 

export default productDetailSlice.reducer;