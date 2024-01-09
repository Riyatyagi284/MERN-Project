import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    error: null,
};

export const getAdminProduct = createAsyncThunk('products/getAdminProduct',
    async (_, { dispatch }) => {
        try {
            dispatch(adminProductRequest());
            const { data } = await axios.get('/api/v1/admin/products');

            dispatch(adminProductSuccess(data.products));
        } catch (error) {
            dispatch(adminProductFail(error.response.data.message))
        }
    })

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        adminProductRequest: (state) => {
            state.loading = true;
        },
        adminProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        adminProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { adminProductSuccess, adminProductRequest, adminProductFail, clearErrors } = productSlice.actions;

export default productSlice.reducer;