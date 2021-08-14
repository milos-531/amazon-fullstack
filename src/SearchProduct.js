import React from 'react';
import "./SearchProduct.css";
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';

function SearchProduct({id, title, price, rating, image, description}) {

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
        <div className="searchProduct">
            <img className="searchProduct__image" src={image} alt="" />
            <div class="searchProduct__info">
                <p class="searchProduct__title">{title}</p>
                <p class="searchProduct__description">{description}</p>
                <p class="searchProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div class="searchProduct__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) =>
                                <p>⭐</p>
                            )
                    }
                </div>
                <Link to={!user && "/login"}>
                    <button onClick={user && addToBasket} className="searchProduct__addToCartButton">Add to basket</button>
                </Link>
            </div>
        </div>
    )
}

export default SearchProduct
