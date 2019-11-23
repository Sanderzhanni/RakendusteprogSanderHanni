import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {userProptypes} from "../store/reducer";
import * as selectors from "../store/selectors";

const imgPath = "/static/img/";

const ProfileIcon = () => {
    return (
        <Link to={"/login"}>
            <button className="loginButton" id="loginButton"><img src={imgPath + "user.png"} className="carticon"/>Login/Signup
            </button>
        </Link>
    );
};

const WelcomeIcon = ({user}) => {
    return (
        <Link to={"/users/" + user._id}>
            <button className="loginButton" id="loginButton"><img src={imgPath + "user.png"}
                                                                  className="carticon"/>Welcome, {user.email}</button>
        </Link>
    );
};

const Cart = () => {
    return (
        <Link to={"/cart"}>
            <button className="cart" id="cart"><img src={imgPath + "cart.png"} className="carticon"/>Shopping Cart
            </button>
        </Link>
    );
};

const Badge = ({children}) => {
    if (children === 0) return null;
    return (
        <span><p className="item-count">{children}</p></span>
    );
};

Badge.propTypes = {
    children: PropTypes.number
};

const Header = ({user, cart}) => {
    return (
        <div className="header">
            <Link to={"/"} className="logohover">
                <img src={imgPath + "tlu.png"} alt="tlu logo" className="logo"/>
            </Link>
            <div className="headerButtons" id="headerButtons">
                {user && <WelcomeIcon user={user}/>}
                {!user && <ProfileIcon/>}
                <Cart/>
                <Badge>{cart.length}</Badge>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.shape(userProptypes),
    cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const ItemProps = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
};

WelcomeIcon.propTypes = {
    user: PropTypes.shape(userProptypes)
};

const mapStateToProps = (store) => {
    return {
        cart: selectors.getCart(store),
        user:selectors.getUser(store)

    };

};

export default connect(mapStateToProps)(Header);

//fix
