import React from 'react'
import "./AdminHeader.css"
import {Link, useHistory} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';

function AdminHeader() {
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();
    const login = () => {
        if(user){
            dispatch({
                type: "SET_USER",
                user: null
              });
        }
        history.push("/");
    }
    return (
        <nav className="adminheader">
            <Link to="/adminhome">
                <img className="adminheader__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/>
            </Link>
            <h1 className="adminheader__link">Admin page</h1>

            <div class="adminheader__nav">
                {/* 1st link */}
                <Link to={!user && "/login"} className="adminheader__link">
                    <div onClick={login} class="adminheader__option">
                        <span className="adminheader__optionLineOne">Hello {user?.name}</span>
                        <span className="adminheader__optionLineTwo">{user ? 'Sign out' : 'Sign in'}</span>
                    </div>
                </Link>
                <Link to={!user ? "/login" : "/adminaddproduct"} className="adminheader__link">
                    <div class="adminheader__option">
                        <span className="adminheader__optionLineOne">Add new</span>
                        <span className="adminheader__optionLineTwo">Products</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default AdminHeader
