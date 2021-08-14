import React, { Component } from 'react';
import { withRouter } from "react-router";
import SearchProduct from "./SearchProduct";
import SortIcon from '@material-ui/icons/Sort';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import "./SearchProduct.css";
import "./Search.css";

var products = null;
var query = null;
var oldQuery = null;
var pdesc = true;
var ndesc = true;

class Search extends Component {
    sortPrice(x) {
        if (pdesc === true)
            products.sort((a, b) => (a.price > b.price) ? 1 : -1);
        else
            products.sort((a, b) => (a.price < b.price) ? 1 : -1);

        pdesc = !pdesc;
        x.forceUpdate();
    }
    sortTitle(x) {
        if (ndesc === true)
            products.sort((a, b) => (a.name > b.name) ? 1 : -1);
        else
            products.sort((a, b) => (a.name < b.name) ? 1 : -1);

        ndesc = !ndesc;
        x.forceUpdate();
    }
    render() {
        if (products == null) {
            return (
                <div className="search">
                    <div class="search__title">
                        <span>Loading results for </span>
                        <span className="search__query">"{query}"</span>
                    </div>
                    <div class="search__content">
                        <div class="search__left">

                        </div>
                        <div className="search__right">
                            <h1>Loading results...</h1>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="search">
                    <div class="search__title">
                        <span>Found {products?.length} results for </span>
                        <span className="search__query">"{query}"</span>
                    </div>
                    <div class="search__content">
                        <div class="search__left">
                            <div class="search__sortButtons">
                                <SortIcon onClick={(e) => this.sortPrice(this)} className="search__sortButton" />
                                <SortByAlphaIcon onClick={(e) => this.sortTitle(this)} className="search__sortButton" />
                            </div>
                        </div>
                        <div class="search__right">
                            <div classname="search__products">
                                {
                                    Array.isArray(products) ? (
                                        products?.map(item => (
                                            <SearchProduct
                                                id={item.id}
                                                title={item.name}
                                                price={item.price}
                                                rating={item.rating}
                                                image={item.image}
                                                description={item.description}
                                            />
                                        ))
                                    ) : ( <h1>No products found</h1> )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
    componentDidUpdate(){
        query = this.props.match.params.query;
        if(query === oldQuery){
            return;
        }
        else{
            oldQuery = query;
            fetch("http://localhost:8000/api/search/" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                products = responseData;
                this.forceUpdate();
            });
        }
    }
    componentDidMount() {
        query = this.props.match.params.query;
        oldQuery = query;
        fetch("http://localhost:8000/api/search/" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => {
                products = responseData;
                this.forceUpdate();
            });
    }

}

export default withRouter(Search);
