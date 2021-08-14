import React from 'react'
import "./Header.css"
import {Link, useHistory} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';

function Header() {
    const [{user, basket}, dispatch] = useStateValue();
    const history = useHistory();
    const login = () => {
        if(user){
            dispatch({
                type: "SET_USER",
                user: null
              });
              dispatch({
                type: "EMPTY_BASKET",
              });
        }
    }
    const search = () => {
        let url = "/search/" + document.getElementById("searchBar").value;
        history.push(url);
    }
    return (
        <nav className="header">
            <Link to="/">
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/>
            </Link>
            <div class="header__search">
                <input type="text" id="searchBar" className="header__searchInput" />
                
                <SearchIcon className="header__searchIcon" onClick={search}/>
            </div>
            <div class="header__nav">
                {/* 1st link */}
                <Link to={!user && "/login"} className="header__link">
                    <div onClick={login} class="header__option">
                        <span className="header__optionLineOne">Hello {user?.name}</span>
                        <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign in'}</span>
                    </div>
                </Link>

                {/* 2nd link */}
                <Link to="/" className="header__link">
                    <div class="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>

                {/* 3d link */}
                <Link to="/" className="header__link">
                    <div class="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                </Link>

                {/* 4th link */}
                <Link to="/checkout" className="header__link">
                    <div class="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Header
