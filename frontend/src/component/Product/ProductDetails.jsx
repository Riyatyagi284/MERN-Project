import React, { useState, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
// import DialogAction from '@mui/material/DialogAction';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';  

import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
// import { clearErrors, getProductDetails, newReview } from "../."
import { clearErrors, getProductDetails } from "../../Slices/ProductDetailSlice"
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/Loader";
import  MetaData  from "../layout/MetaData";
// import { addItemToCart } from ''
import Rating from '@mui/material/Rating';

import "./ProductDetails.css";

const ProductDetails = () => {

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")

    const { id } = useParams();
    const dispatch = useDispatch();
    // toast

    const { product, loading, error } = useSelector((state) => state.productDetail);

    // const { success, error: reviewError } = useSelector((state) => state.newReview);
console.log("state. productDetails", { product, loading, error } )
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: false,
        precision: 0.5,
    }


    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        toast.success("Item Added to cart successfully!!");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false);
    };


    // sencond useEffect
    useEffect(() => {
        if (error) {
            // toast.error(error)
            dispatch(clearErrors());
        }

        // if (reviewError) {
        //     // toast.error(reviewError);
        //     dispatch(clearErrors());
        // }

        // if (success) {
        //     toast.success("Review submitted successfully");
        //     dispatch(newReview)
        // }
        dispatch(getProductDetails(id));
    // }, [dispatch, id, error, alert, reviewError, success]);
    }, [dispatch, id, error]);

    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <MetaData title={`${product.name} --ECOMMERCE`} />
                        <div className="ProductDetails">
                            <div>
                                <Carousel> 
                                    {product.images && product.images.map((item, i) => (
                                    <div key={i}>  
                                        <img className="CarouselImage" src={item.url} alt={`${i} Slide`} />
                                    </div>
                                    ))}
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>
                                <div className="detailsBloack-2">
                                    <Rating {...options} />

                                    <span className="detailsBlock-2-span">
                                        {" "} ({product.numOfReviews} Reviews)
                                    </span>
                                </div>

                                <div className="detailsBlock-3">
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailBlock-3-1">
                                        <div className="detailBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />

                                            <button onClick={increaseQuantity}>+</button>
                                        </div>

                                        <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler} >Add To Cart</button>
                                    </div>

                                    <p>Status: <b className={product.Stock < 1 ? "redColor" : "greenColor"}> {product.Stock < 1 ? "OutOfStock" : "InStock"} </b></p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>

                                <button onClick={submitReviewToggle} className="submitReview">SubmitReview
                                </button>
                            </div>
                        </div>

                        <h3 className="reviewHeading">REVIEWS</h3>

                        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>

                            <DialogTitle>Submit Review</DialogTitle>

                            <DialogContent className="submitDialog">
                                <Rating onChange={(e) => setRating(e.target.value)}
                                    value={rating} size="large" />

                                <textarea className="submitDialogTextArea" cols="30" rows="5" onChange={(e) => setComment(e.target.value)} value={comment} ></textarea>
                            </DialogContent>

                            {/* <DialogAction> */}
                                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>

                                <Button onClick={reviewSubmitHandler} color="Primary">Submit</Button>
                            {/* </DialogAction> */}
                        </Dialog>

                        {
                            product.reviews && product.reviews[0] ? (
                                <div className="reviews">
                                    {
                                        product.reviews && product.reviews.map((review) => (
                                            <ReviewCard key={review._id} review={review} />
                                        ))
                                    }
                                </div>
                            ) : (<p className='noReviews'>No Reviews Yet</p>)
                        }
                    </>
                )
            }
        </>
    )
}

export default ProductDetails