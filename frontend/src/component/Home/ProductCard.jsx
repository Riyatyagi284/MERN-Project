import React, { useState } from 'react'
import { Link } from "react-router-dom"

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductCard = ({product}) => {
    const [value, setValue] = useState(0);
   
    return (
        <Link to={`/product/${product._id}`} className="productCard">
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>

            <div>
                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                
                </Stack> {" "}

                <span className="productCardSpan">
                    {" "} ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard