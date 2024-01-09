import { configureStore } from "@reduxjs/toolkit";
import createProductReducer from './Slices/createProductSlice';
import getAdminProductReducer from './Slices/getAdminProductSlice';
import getUserProductReducer from './Slices/getUserProductSlice';
import getProductPageReducer from "./Slices/getProductPageSlice";
import productDetailReducer from './Slices/productDetailSlice';
import updateDeleteReducer from './Slices/updateDeleteSlice';

const store = configureStore({
  reducer: {
    createProduct: createProductReducer,
    adminProduct: getAdminProductReducer,
    userProduct: getUserProductReducer,
    allProducts: getProductPageReducer,
    productDetail: productDetailReducer,
    updateDelete: updateDeleteReducer,
  }
});

export default store;