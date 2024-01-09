import { useState, useEffect } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider } from '@mui/material';
// import toast
import { Typography } from '@mui/material';
import { clearErrors, getAllProductsAsync } from "../../Slices/getProductPageSlice"
import { useParams } from 'react-router-dom';

import "./Products.css"

const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];


const Products = () => {
    const dispatch = useDispatch();

    // toast

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const { products, loading, error, productsCount,resultPerPage, filteredProductCount } = useSelector((state) => state.allProducts);
    
    console.log("products",products)
    const { keyword } = useParams();    

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    let count = filteredProductCount;

    useEffect(() => {
        if (error) {
            // toast
            dispatch(clearErrors());
        }
 
        if (keyword) {
        dispatch(getAllProductsAsync(keyword, currentPage, price, category, ratings))
        } else {
            dispatch(getAllProductsAsync(currentPage, price, category, ratings))
        }
    
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);


    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <MetaData title="PRODUCTS -- ECOMMERCE" />
                        <h2 className='productsHeading' >Products</h2>

                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={25000} />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li className='category-link' key={category} onClick={() => setCategory(category)}>{category}</li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider value={ratings} onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }} aria-labelledby="continuous-slider" valueLabelDisplay="auto" min={0} max={5} />
                            </fieldset>
                        </div>

                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText="Next" prevPageText="Prev" firstPageText="1st" lastPageText="Last" itemClass="page-item"
                                    linkClass="page-link" activeClass="pageItemActive" activeLinkClass="pageLinkActive" />
                            </div>
                        )}
                    </>
                )}
        </>
    )
}

export default Products;