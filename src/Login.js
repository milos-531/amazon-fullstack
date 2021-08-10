import React, {useState} from 'react';
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import {auth} from './firebase';

function Login() {

    const history = useHistory();
    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const login = event => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push("/");
            })
            .catch(e => alert(e.message));
    }
    async function register(){


        if(!name){
            document.getElementById("name").style.borderColor = "red";
            alert("Name is required for registration.")
        }
        else{
            document.getElementById("name").style.borderColor = "white";
            let item = {name, email, password}
            let result = await fetch("http://localhost:8000/api/register",{
                method:"POST",
                body:JSON.stringify(item),
                headers:{
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            })

            result = await result.json();

            if(result === 0){
                alert("Registration failed, this email is occupied.");
            } else{
                alert("Success, your account has been created.");
                let account = {email, name};
                localStorage.setItem("user-info",JSON.stringify(result));
                history.push("/");
            }
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
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password}  onChange={event => setPassword(event.target.value)}/>
                    <h5>Name</h5>
                    <input type="text" id="name" value={name} onChange={event => setName(event.target.value)}/>
                    <button onClick={login} type="submit" className="login__signInButton">Sign in</button>
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
