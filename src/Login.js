import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [{ user }, dispatch] = useStateValue();
    const axios = require('axios');
    async function login() {

        let ok = true;
        if (!email) {
            document.getElementById("email").style.borderColor = "red";
            ok = false;
        } else {
            document.getElementById("email").style.borderColor = "white";
        }
        if (!password) {
            document.getElementById("password").style.borderColor = "red";
            ok = false;
        } else {
            document.getElementById("password").style.borderColor = "white";
        }
        if (!ok) {
            return;
        }
        let item = { email, password }
        let res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        res = await res.json();

        if (res === 0) {
            alert("Login failed, invalid credentials.");
            return;
        }

        dispatch({
            type: "SET_USER",
            user: res
        })
        if(res.role === "user"){
            let id = res.id;
            let resCart = await fetch("http://localhost:8000/api/cartlist/"+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
    
            resCart = await resCart.json();
            resCart.forEach(item => {
                dispatch({
                    type: 'ADD_TO_BASKET',
                    item: {
                        id: item.id,
                        title: item.name,
                        image: item.image,
                        price: item.price,
                        rating: item.rating
                    },
                })
            });
            history.push("/");
        }
        else if (res.role === "admin"){
            history.push("/adminhome");
        }

    }

    async function register() {

        let ok = true;
        if (!email) {
            document.getElementById("email").style.borderColor = "red";
            ok = false;
        } else {
            document.getElementById("email").style.borderColor = "white";
        }
        if (!password) {
            document.getElementById("password").style.borderColor = "red";
            ok = false;
        } else {
            document.getElementById("password").style.borderColor = "white";
        }
        if (!name) {
            document.getElementById("name").style.borderColor = "red";
            ok = false;
        } else {
            document.getElementById("name").style.borderColor = "white";
        }
        if (!ok) {
            alert("All fields are required for registration.");
            return;
        }

        //email validation via https://app.abstractapi.com/api/email-validation/tester
        let ok2 = true;
        await axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=5ab01ebb4a894bf58042e962e20de87a&email='+email)
            .then(response => {
                console.log(response.data);
                let deliverability = response.data.deliverability;
                let quality = response.data.quality_score;
                if(deliverability !== "DELIVERABLE" && (deliverability !=="UNKNOWN" && quality < 0.90)){
                    alert("The email: (" + email + ") has been deemed risky or undeliverable. Please enter valid email");
                    ok2 = false;
                    return;
                }
            })
            .catch(error => {
                console.log(error);
            });
        if(!ok2){
            return;
        }
        document.getElementById("name").style.borderColor = "white";
        let item = { name, email, password }
        let result = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        result = await result.json();

        if (result === 0) {
            alert("Registration failed, this email is occupied.");
        } else {
            alert("Success, your account has been created.");
            history.push("/");
        }

    }
    return (
        <div className="login">
            <Link to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" className="login__logo" />
            </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} required />
                    <h5>Password</h5>
                    <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} required />
                    <h5>Name</h5>
                    <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} />
                    <button onClick={login} type="button" className="login__signInButton">Sign in</button>
                </form>
                <p>By signing in you agree to Amazon's Conditions of Use & Sale.
                    Please see our Privacy Notice, our Cookies Notice and our Interest-based Ads Notice.
                </p>
                <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
