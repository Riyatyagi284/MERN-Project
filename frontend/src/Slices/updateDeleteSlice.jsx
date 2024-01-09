import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
};

export const updateProduct = createAsyncThunk('product/updateProduct',
    async ({ id, productData }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(updateProductRequest());
            const config = {
                headers: { "Content-Type": "application/json" },
            };

            const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

            dispatch(updateProductSuccess(data.product));

        } catch (error) {
            // return rejectWithValue(error.response.data.message);
            dispatch(updateProductFail(error.response.data.message));
        };
    });

export const deleteProduct = createAsyncThunk('product/deleteProduct',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            dispatch(deleteProductRequest());
            const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

            dispatch(deleteProductSuccess(data.success))
            
        } catch (error) {
            // return rejectWithValue(error.response.data.message);
            dispatch(deleteProductFail(error.response.data.message));
        }
    })

const updateDeleteProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        deleteProductRequest: (state) => {
            state.loading = true;
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductReset: (state) => {
            state.isDeleted = false;
        },
        updateProductRequest: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        updateProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductReset: (state) => {
            state.isDeleted = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    deleteProductRequest,deleteProductSuccess,deleteProductFail,deleteProductReset,updateProductRequest,updateProductSuccess,updateProductFail,updateProductReset,clearErrors,
} = updateDeleteProductSlice.actions;

export default updateDeleteProductSlice.reducer;