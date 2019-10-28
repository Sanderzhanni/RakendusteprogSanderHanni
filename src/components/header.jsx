import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import PropTypes from "prop-types";
import {Auth_context} from "../index.jsx";


const ProfileIcon = () => {
  return(
    <Link to={"/login"}>
        <button className="loginButton" id="loginButton"><img src="/img/user.png" className="carticon" />Login/Signup</button>
    </Link>
  );
};

const WelcomeIcon = ({user}) => {
  return(
    <Link to={"/users/"+user._id}>
     <button className="loginButton" id="loginButton"><img src="/img/user.png" className="carticon" />Welcome, {user.email}</button>
    </Link>
  );
};

const Header = () => {
  return (
    <Auth_context.Consumer>

      {
        (context_value) =>(
          <div className="header">
          <Link to={"/"}>
            <img src="/img/tlu.png" alt="tlu logo" className="logo" />
          </Link>
          <div className="headerButtons" id="headerButtons">
            {context_value.user.email && <WelcomeIcon user={context_value.user} />}
            {!context_value.user.email && <ProfileIcon />}
            <button className="cart" id="cart"><img src="/img/cart.png" className="carticon" />Shopping Cart</button>
          </div>
        </div>
        )
        
      }

    </Auth_context.Consumer>
    
  );
};

/* Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
}; */

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;

//fix
