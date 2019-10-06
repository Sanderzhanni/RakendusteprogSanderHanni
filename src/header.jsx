import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import "./header.css";
>>>>>>> lesson5

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src="/img/tlu.png" alt="tlu logo" className="logo"/>
      </Link>
      <div className="headerButtons" id="headerButtons">
<<<<<<< HEAD
        <button className="loginButton" id="loginButton"><img src="/img/login.png" className="loginicon" />Login/Signup</button>
        <button className="cart" id="cart"><img src="/img/cartIcon.jpg" className="carticon"/>Shopping Cart</button>
=======
              <button className="loginButton" id="loginButton"><img src="/img/user.png" className="carticon" />Login/Signup</button>
        <button className="cart" id="cart"><img src="/img/cart.png" className="carticon"/>Shopping Cart</button>
>>>>>>> lesson5
      </div>
    </div>
  );
};

export default Header;

//fix
