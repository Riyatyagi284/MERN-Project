import React from 'react'
import { useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import { getProductAsync, clearErrors } from "../../Slices/getUserProductSlice"

import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader/Loader";
// import {toast} from "react-toast";
import "./Home.css";
import ProductCard from "./ProductCard"
import MetaData from "../layout/MetaData" 

const Home = () => {

const dispatch = useDispatch();
const { loading, error, products } = useSelector((state) => state.userProduct); // from store (reducer name)

let keyword;
let currentPage;
let price;
let category;
let ratings;

console.log("products",products)

useEffect(() => {
if(error) {
    // toast.error(error)
    dispatch(clearErrors());
}
dispatch(getProductAsync(keyword = '', currentPage = 1,price = [0, 1200], category, ratings = 0));
}, [dispatch, error ])



    return (
        <>
            {loading ? <Loader /> : (<>
                <MetaData title="ECOMMERCE" />

                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse />
                        </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Products</h2>

                <div className="container" id="container">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </>)}
        </>
    )
}

export default Home