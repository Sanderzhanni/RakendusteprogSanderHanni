import React from "react";
import PropTypes from "prop-types";
import "./FancyButton.css";

const FancyButton = ({children}) =>(
    <div className={"FancyButton"}>
        <div>{children}</div>
    </div>
);





FancyButton.propTypes = {
  children: PropTypes.string.isRequired
};

export default FancyButton;