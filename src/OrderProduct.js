import React from 'react';
import "./OrderProduct.css";
import { useStateValue } from './StateProvider';

function OrderProduct({id, title, price, rating, image, removeOrder}) {

    const [{user}] = useStateValue();
    async function removeFromOrders(){
        let user_id = user?.id;
        let product_id = id;
        let item = { user_id, product_id }
        let result = await fetch("http://localhost:8000/api/remove_from_orders", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json();

        if (result === 0) {
            alert("Failed to remove your order");
            return;
        } else {
            removeOrder();
        }

    }
    return (
        <div className="orderProduct">
            <img className="orderProduct__image" src={image} alt="" />
            <div class="orderProduct__info">
                <p class="orderProduct__title">{title}</p>
                <p class="orderProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div class="orderProduct__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) =>
                                <p>⭐</p>
                            )
                    }
                </div>
                <button onClick={removeFromOrders}>Remove from orders</button>
            </div>
        </div>
    )
}

export default OrderProduct
