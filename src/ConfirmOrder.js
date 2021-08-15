import React, {useState} from 'react'
import { getBasketTotal } from './reducer';
import { useStateValue } from "./StateProvider";
import {useHistory} from "react-router-dom";
import "./ConfirmOrder.css";
function ConfirmOrder() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [address, setAddress] = useState('');
    const history = useHistory();
    const total = getBasketTotal(basket);
    async function sendOrder() {

        let ok = true;
        
        if(!address){
            document.getElementById("address").style.borderColor = "red";
            ok = false;
        } else{
            document.getElementById("address").style.borderColor = "white";
        }
        if(document.querySelector('input[name="payment"]:checked') == null){
            document.getElementById("radioButtons").style.border = "1px solid #ff0000";
            ok = false;
        } else{
            document.getElementById("radioButtons").style.border = null;
        }

        if(!ok){
            return;
        }
        let payment = document.querySelector('input[name="payment"]:checked').value;
        let user_id = user.id;
        let item = { address, payment, user_id }
        let result = await fetch("http://localhost:8000/api/placeorder", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json();

        if (result === 0) {
            alert("Failed to place order.");
        } else {
            alert("Success, your order has been placed.");
            dispatch({
                type: "EMPTY_BASKET",
              });
            history.push("/orders");
        }

    }
    return (


        <div className="confirmorder">
            <div class="confirmorder__content">
                <h1>Your total</h1>
                <table class="confirmorder__table">
                    <tbody>
                        <tr>
                            <td>Amount</td>
                            <td className="confirmorder__total">$ {total}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>15 %</td>
                        </tr>
                        <tr>
                            <td>Delivery</td>
                            <td>$ 10 per item</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td className="confirmorder__total">$ {(total + total * 0.15 + 10 * basket.length).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <h1>Your information</h1>
                <form class="confirmorder__form">
                    <h5>Address</h5>
                    <input type="Text" id="address" onChange={event => setAddress(event.target.value)}></input>
                    <div class="confirmorder__radioButtons" id="radioButtons">
                        <input type="radio" value="online" name="payment" required /><span> Online payment</span> <br></br>
                        <input type="radio" value="cash" name="payment" required /><span> Payment on delivery</span> <br></br>
                        <input type="radio" value="emi" name="payment" required /><span> EMI payment</span> <br></br>
                    </div>
                    <button type="button" onClick={sendOrder} class="confirmorder__button">Order Now</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmOrder