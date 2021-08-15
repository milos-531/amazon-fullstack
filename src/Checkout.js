import React from 'react';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import './Checkout.css';

function Checkout() {
    const[{basket}, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div class="checkout__left">
                <img class="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/02/IT-hq/2021/img/Amazon_Exclusives/XCM_Manual_1344644_1759635_UK_es_it_de_fr_uk_exclusive_week_ilm_gb_en_3964492_1300x90_2X_en_GB.jpg" alt="" />
                {basket?.length === 0 ? (
                    <div>
                        <h2>Your shopping basket is empty</h2>
                        <p>You have no items in your basket. To buy one or more items, click "Add to basket" next to the item.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="checkout__title">Your shopping basket</h2>
                        {basket?.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            />
                        ))}
                    </div>
                )}
            </div>
            {basket?.length > 0 && (
                <div class="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout
