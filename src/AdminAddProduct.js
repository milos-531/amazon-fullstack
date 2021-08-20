import React from 'react'
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router';
import './AdminAddProduct.css';
import { ListItemSecondaryAction } from '@material-ui/core';
function AdminAddProduct() {
    const[{user}] = useStateValue();
    const history = useHistory();
    const[name,setName] = useState('');
    const[category, setCat] = useState('');
    const[description,setDes] = useState('');
    const[price,setPrice] = useState('');
    const[rating,setRat] = useState('');
    const[image,setImg] = useState('');

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    function createProduct(){

        if(!user || user.role !== "admin"){
            alert("You must be logged in as an admin in order to submit new products");
            history.push("/login");
            return;
        }
        let ok = true;

        if(!name){
            document.getElementById("name").style.borderColor = "red";
            ok = false;
        } 
        else {
            document.getElementById("name").style.borderColor = "white";
        }
        if(!category){
            document.getElementById("category").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("category").style.borderColor = "white";
        }
        if(!description){
            document.getElementById("description").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("description").style.borderColor = "white";
        }
        if(!price){
            document.getElementById("price").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("price").style.borderColor = "white";
        }
        if(!rating){
            document.getElementById("rating").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("rating").style.borderColor = "white";
        }
        if(!name){
            document.getElementById("name").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("name").style.borderColor = "white";
        }
        if(!image || !checkURL(image)){
            document.getElementById("image").style.borderColor = "red";
            ok = false;
        }
        else{
            document.getElementById("image").style.borderColor = "white";
        }

        if(!ok){
            alert("All fields are necessary");
            return;
        }
        let pricef = parseFloat(price);
        pricef = pricef.toFixed(2);

        let items = {name, category, description, pricef, rating, image};
        fetch("http://localhost:8000/api/addproduct/", {
            method: "POST",
            body: JSON.stringify(items),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                if (responseData === -1) {
                    alert("Error, unable to add product");
                    return;
                }
                else if(responseData === -2){
                    alert("Product with the name '" + name + "' already exists");
                    return;
                }
                else{
                    alert("Product successfully added.")
                    history.push("./adminhome");
                }
            });
    }
    return (
        <div className="adminaddproduct">
            <div class="adminaddproduct__newproduct">
                <h1>Add new product</h1>
                <h5>Name</h5>
                <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} className="adminaddproduct__name"></input>
                <h5>Category</h5>
                <input type="text" id="category" value={category} onChange={event => setCat(event.target.value)} className="adminaddproduct__category"></input>
                <h5>Description</h5>
                <input type="text" id="description" value={description} onChange={event => setDes(event.target.value)} className="adminaddproduct__description"></input>
                <h5>Price</h5>
                <input type="number" id="price" min="0" step="0.01" value={price} onChange={event => setPrice(event.target.value)} className="adminaddproduct__price"></input>
                <h5>Rating</h5>
                <select id="rating" value={rating} onChange={event => setRat(event.target.value)} className="adminaddproduct__rating">
                    <option value="" disabled selected>Set product rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <h5>Image</h5>
                <input type="text" id="image" value={image} onChange={event => setImg(event.target.value)} className="adminaddproduct__image"></input>
                <button class="adminaddproduct__button" onClick={() => createProduct()}>Submit product</button>
            </div>
        </div>
    )
}

export default AdminAddProduct
