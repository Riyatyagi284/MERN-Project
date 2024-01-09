import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductCount: 0,
    error: null,
};

export const getAllProductsAsync = createAsyncThunk('productPage/getAllProducts',
    async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }, { dispatch }) => {
        try {
            dispatch(allProductsRequest());
            let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

            if (category) {
                link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            }

            const response = await axios.get(link);
            console.log("response", response)
            const data = response.data;

            dispatch(allproductsSuccess(data));
        } catch (error) {
            dispatch(allProductsFail(error.response?.data?.message))
        }
    }
)

const getProductPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        allProductsRequest: (state) => {
            state.loading = true;
            state.products = [];
        },
        allproductsSuccess: (state, action) => {
            console.log("action",action.payload)
            const { products, productsCount, resultPerPage, filteredProductCount } = action.payload;

            state.loading = false;
            state.products = products;
            state.productsCount = productsCount;
            state.resultPerPage = resultPerPage;
            state.filteredProductCount = filteredProductCount;
        },
        allProductsFail: (state) => {
            state.loading = false;
            state.error = state.error;
        },
        clearErrors: (state) => {
            state.error = null;
        },

        // extraReducers: (builder) => {
        //     builder
        //         .addCase(getAllProductsAsync.pending, (state) => {
        //             state.loading = true;
        //             state.products = [];
        //             state.error = null;
        //         })
        //         .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        //             const { products, productsCount, resultPerPage, filteredProductCount } = action.payload;

        //             state.loading = false;
        //             state.products = products;
        //             state.productsCount = productsCount;
        //             state.resultPerPage = resultPerPage;
        //             state.filteredProductCount = filteredProductCount;
        //         })
        //         .addCase(getAllProductsAsync.rejected, (state, action) => {
        //             state.loading = false;
        //             state.error = action.payload;
        //         });
        // },
    }
})

export const { allProductsRequest, allProductsFail, allproductsSuccess, clearErrors } = getProductPageSlice.actions;

export default getProductPageSlice.reducer;