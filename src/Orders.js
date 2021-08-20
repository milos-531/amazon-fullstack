import React, { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider';
import OrderProduct from './OrderProduct';
import './Orders.css';
function Orders() {
    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState('');
    useEffect(() => {
        getOrders();
    }, []);
    function getOrders(){
        if(!user){
            return;
        }
        fetch("http://localhost:8000/api/getorders/" + user.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                setOrders(responseData);
            });
    }
    return (
        <div className="orders">
            <img src="https://images-fe.ssl-images-amazon.com/images/G/35/kindle/merch/2021/aucc/campaign/prime/pc_gw_prime_ech_ft_2x._CB644017190_.jpg" alt="" class="orders__image" />
            <div class="orders__content">

                {user ?
                    (<div className="orders__products">
                        <h3>Your orders, {user.name}</h3>
                        {orders && orders?.map(item => (
                            <OrderProduct
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                                removeOrder = {getOrders}
                            />
                        ))
                        }
                    </div>



                    ) :
                    (<h3>You're not logged in</h3>)}
            </div>

        </div>
    )
}

export default Orders;
