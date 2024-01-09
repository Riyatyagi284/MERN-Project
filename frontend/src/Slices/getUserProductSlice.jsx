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

export const getProductAsync = createAsyncThunk('products/getProduct',
async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }, { dispatch }) => {
 try {
    dispatch(allProductRequest());
    // let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
   
    let link = `http://localhost:4000/api/v1/products`;

    // if(category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    // }

    const response = await axios.get(link);
    const data = response.data;
    console.log("userProductSliceData", data)

    dispatch(allProductSuccess(data));
 } catch (error) {
    dispatch(allProductFail(error.response?.data?.message || "Unknown error"))
 }
})

const getProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.products = [];
        },
        allProductSuccess: (state,action) => {

          const { products, productsCount, resultPerPage, filteredProductCount } = action.payload;

            state.loading = false;
            state.products = products;
            state.productsCount = productsCount;
            state.resultPerPage = resultPerPage;
            // state.filteredProductCount = filteredProductsCount;
            state.filteredProductCount = filteredProductCount;
        },
        allProductFail: (state) => {
            state.loading = false;
            state.error = state.error;
        },
        clearErrors: (state) => {
            state.error = null;
        },
       
        extraReducers: (builder) => {
            builder
              .addCase(getProductAsync.pending, (state) => {
                state.loading = true;
                state.products = [];
                state.error = null;
              })
              .addCase(getProductAsync.fulfilled, (state, action) => {
                const { products, productsCount, resultPerPage, filteredProductCount } = action.payload;
          
                state.loading = false;
                state.products = products;
                state.productsCount = productsCount;
                state.resultPerPage = resultPerPage;
                state.filteredProductCount = filteredProductCount;
              })
              .addCase(getProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
          },

    },
})

export const { allProductRequest, allProductSuccess, allProductFail, clearErrors } = getProductSlice.actions;

export default getProductSlice.reducer;

// Note : we write initial state (as reducers) and  (we write terms inside async are for actions)