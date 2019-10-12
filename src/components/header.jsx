import React from "react";
import { Link } from "react-router-dom";
import "./header.css";


const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src="/img/tlu.png" alt="tlu logo" className="logo"/>
      </Link>
      <div className="headerButtons" id="headerButtons">
        <Link to={"/login"}>
            <button className="loginButton" id="loginButton"><img src="/img/user.png" className="carticon" />Login/Signup</button>
        </Link>
        <button className="cart" id="cart"><img src="/img/cart.png" className="carticon"/>Shopping Cart</button>
      </div>
    </div>
  );
};

export default Header;

//fix
