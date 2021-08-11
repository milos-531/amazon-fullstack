import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider';
import {Link} from "react-router-dom";
function Product({id, title, image, price, rating}) {
    const [{user}, dispatch] = useStateValue();
    async function addToBasket(){

        let user_id = user?.id;
        let product_id = id;
        let item = { user_id, product_id }
        let result = await fetch("http://localhost:8000/api/add_to_cart", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json();

        if (result === 0) {
            alert("Failed to add product");
            return;
        } 
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            },
        })
    };
    return (
        <div className="product">
            <div class="product__info">
                <p>{title}</p>
                <p class="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div class="product__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) =>
                                <p>⭐</p>
                            )
                    }
                </div>
            </div>
            <img src={image} alt="" />
            <Link to={!user && "/login"}>
                <button onClick={user && addToBasket} className="product__addToCartButton">Add to basket</button>
            </Link>
        </div>
    )
}

export default Product
