import React, { useEffect } from 'react';
import Product from "./Product";
import "./Home.css";
import { Component } from 'react';


var products = null;
class Home extends Component {

    render() {
        if(products == null)
        return (
            <div className="home">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />
                <h1>Loading products...</h1>
            </div>
        );
        if(products != null)
        return (
            <div className="home">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />
                <div class="home__row">

                    <Product
                        id={products[0].id}
                        title={products[0].name}
                        price={products[0].price}
                        rating={products[0].rating}
                        image={products[0].image}
                    />
                    <Product
                        id={products[1].id}
                        title={products[1].name}
                        price={products[1].price}
                        rating={products[1].rating}
                        image={products[1].image}
                    />
                </div>
                <div class="home__row">
                    <Product
                        id={products[2].id}
                        title={products[2].name}
                        price={products[2].price}
                        rating={products[2].rating}
                        image={products[2].image}
                    />
                    <Product
                        id={products[3].id}
                        title={products[3].name}
                        price={products[3].price}
                        rating={products[3].rating}
                        image={products[3].image}
                    />
                    <Product
                        id={products[4].id}
                        title={products[4].name}
                        price={products[4].price}
                        rating={products[4].rating}
                        image={products[4].image}
                    />
                </div>
                <div class="home__row">
                    <Product
                        id={products[5].id}
                        title={products[5].name}
                        price={products[5].price}
                        rating={products[5].rating}
                        image={products[5].image}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (products == null) {

            fetch("http://localhost:8000/api/getproducts/" + 6, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => { return response.json(); })
                .then(responseData => {
                    console.log(responseData);
                    products = responseData;
                    console.log("++++++++++++++++++++++++++++++++++++++");
                    console.log(products);
                    this.forceUpdate();
                });
        }
    }
}


export default Home;
