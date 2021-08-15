import React, { useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import Search from './Search';
import Orders from './Orders';
import ConfirmOrder from "./ConfirmOrder";
import { useStateValue } from "./StateProvider";

function App() {

  const [{ user }, dispatch] = useStateValue();


  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>
        <Route path="/search/:query">
          <Header />
          <Search />
        </Route>
          <Route path="/confirmorder">
            <Header />
            <ConfirmOrder />
          </Route>
          {/* HOMEPAGE */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
      </Switch>
    </Router>
      );
}

      export default App;
