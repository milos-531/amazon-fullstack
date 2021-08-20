import React, { useEffect } from 'react'
import { useState } from 'react';
import './AdminHome.css'
import { useStateValue } from './StateProvider';

function AdminHome() {

    const [{ user }] = useStateValue();
    const [orders, setOrders] = useState('');
    const [products, setProducts] = useState('');

    useEffect(() => {
        if (!user) {
            return;
        }
        getOrders();
        getProducts();
    }, []);

    function markPaid(item) {
        if(item.payment_status === "paid"){
            alert("Delivery has already been paid for");
            return;
        }
            item.payment_status = "paid";
            updateOrder(item);

    }
    function markDelivered(item){
            if(item.payment_status == "pending"){
                alert("Order must be paid before it can be completed");
                return;
            }
            if(item.payment_status === "delivered"){
                alert("Delivery has already been delivered");
                return;
            }
            item.status = "delivered";
            updateOrder(item);

    }
    function markCancelled(item){
        if(item.payment_status === "cancelled"){
            alert("Delivery has already been cancelled");
            return;
        }
            item.status = "cancelled";
            updateOrder(item);
        
    }
    function updateOrder(item){
        if(!window.confirm("Are you sure you wish to update this record?")){
            return;
        }
        fetch("http://localhost:8000/api/updateorder/", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                if (responseData === -1) {
                    alert("Error updating records");
                    return;
                }
                setOrders(responseData);
            });
    }
    function removeProduct(item){
        if(!window.confirm("Are you sure you wish to remove: " + item.name)){
            return;
        }
        fetch("http://localhost:8000/api/removeproduct/" + item.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                if (responseData === -1) {
                    alert("Only administrators may access backend data");
                    return;
                }
                setProducts(responseData);
            });

    }
    function getOrders() {
        fetch("http://localhost:8000/api/getallorders/" + user.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                if (responseData === -1) {
                    alert("Only administrators may access backend data");
                    return;
                }
                setOrders(responseData);
            });
    }
    function getProducts() {
        fetch("http://localhost:8000/api/getallproducts/" + user.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                if (responseData === -1) {
                    alert("Only administrators may access backend data");
                    return;
                }
                setProducts(responseData);
            });
    }
    return (
        <div className="adminhome">
            <div class="adminhome__orders">
                <h1>Pending orders</h1>
                <div class="adminhome__ordersSearch">
                {Array.isArray(orders) && 
                            orders?.map(item => (
                            <div className="adminhome__order adminhome__list">
                                <h3>Product: {item.name}</h3>
                                <h5>Ordered by: {item.email}</h5>
                                <h5>Price: {(item.price * 1.15 + 10).toFixed(2)}</h5>
                                <h5>Payment type: {item.payment_method}</h5>
                                <h5>Payment status: {item.payment_status}</h5>
                                <h5>Delivery status: {item.status}</h5>
                                <div class="adminhome__buttons">
                                    <button onClick={() => markPaid(item)}>Mark paid</button>
                                    <div class="divider"/>
                                    <button onClick={() => markDelivered(item)}>Mark delivered</button>
                                    <div class="divider"/>
                                    <button onClick={() => markCancelled(item)}>Cancel order</button>
                                </div>
                                <hr/>
                            </div>
                        ))}
                </div>
                <div class="adminhome__ordersControl">

                </div>
            </div>
            <div class="adminhome__products">
                <h1>Available products</h1>
                <div class="adminhome__productsSearch">
                {Array.isArray(products) && 
                            products?.map(item => (
                            <div className="adminhome__product adminhome__list">
                                <h3>Product: {item.name}</h3>
                                <h5>Category: {item.category}</h5>
                                <h5>Description: {item.description}</h5>
                                <h5>Price: {item.price}</h5>
                                <div class="adminhome__buttons">
                                    <button onClick={() => removeProduct(item)}>Remove product</button>
                                </div>
                                <hr/>
                            </div>
                        ))}
                </div>
                <div class="adminhome__productsControl">

                </div>
            </div>
        </div>
    )
}

export default AdminHome
