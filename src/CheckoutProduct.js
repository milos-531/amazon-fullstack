import React from 'react';
import "./CheckoutProduct.css";
import { useStateValue } from './StateProvider';

function CheckoutProduct({id, title, price, rating, image}) {

    const [{user},dispatch] = useStateValue();
    async function removeFromBasket(){
        let user_id = user?.id;
        let product_id = id;
        let item = { user_id, product_id }
        let result = await fetch("http://localhost:8000/api/remove_from_cart", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json();

        if (result != 1) {
            alert(result);
            return;
        }
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />
            <div class="checkoutProduct__info">
                <p class="checkoutProduct__title">{title}</p>
                <p class="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div class="checkoutProduct__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) =>
                                <p>⭐</p>
                            )
                    }
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
