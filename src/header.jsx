import React from "react";
import {Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src="./img/tlu.png" alt="tlu logo" className="logo"/>
      </Link>
      <div className="headerButtons" id="headerButtons">
        <button className="loginButton" id="loginButton">Login/Signup</button>
        <button className="cart" id="cart"><img src="./img/cartIcon.jpg" className="carticon"/>Shopping Cart</button>
      </div>
    </div>
  );
};

export default Header;

//fix
