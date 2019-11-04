import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import PropTypes from "prop-types";
import auth_consumer from "./authConsumer.jsx";

const imgPath = "/img";

const ProfileIcon = () => {
  return(
    <Link to={"/login"}>
        <button className="loginButton" id="loginButton"><img src={imgPath+"/user.png"} className="carticon" />Login/Signup</button>
    </Link>
  );
};

const WelcomeIcon = ({user}) => {
  return(
    <Link to={"/users/"+user._id}>
     <button className="loginButton" id="loginButton"><img src={imgPath+"/user.png"} className="carticon" />Welcome, {user.email}</button>
    </Link>
  );
};

const Cart = () =>{
  return(
    <Link to={"/cart"}>
    <button className="cart" id="cart"><img src={imgPath+"/cart.png"} className="carticon" />Shopping Cart</button>
    </Link>
  );
};

const Header = ({user}) => {
  return (
    <div className="header">
      <Link to={"/"} className="logohover">
        <img src={imgPath+"/tlu.png"} alt="tlu logo" className="logo" />
      </Link>
      <div className="headerButtons" id="headerButtons">
        {user.email && <WelcomeIcon user={user} />}
        {!user.email && <ProfileIcon />}
        <Cart />
      </div>
    </div>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
}; 

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired,
};

export default auth_consumer(Header);

//fix
