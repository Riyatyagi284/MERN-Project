// Only admin can create product

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    loading: false,
    success: false,
    error: null,
}

export const createProduct = createAsyncThunk('createNewProduct/createProduct', 
async ( productData, { dispatch } ) => {
    try {
       dispatch(newProductRequest());

       const config = {
        headers: { "Content-Type": "application/json" },
       }

       const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

       dispatch(newProductSuccess(data));

    } catch (error) {
        dispatch(newProductFail(error.response.data.message));
    }
})

const createProductSlice = createSlice ({
    name: 'createNewProduct',
    initialState,
    reducers: {
        newProductRequest: (state) => {
            state.loading = true;
        },
        newProductSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        newProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    }
})

export const { newProductRequest, newProductSuccess, newProductFail } = createProductSlice.actions;

export default createProductSlice.reducer;