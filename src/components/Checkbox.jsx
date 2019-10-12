import React from "react";
import PropTypes from "prop-types";
import "./checkbox.css";

const Checkbox = ({name, onChange, checked}) => {
    return (
        <label className="toggle" htmlFor={name}>
            {name}
          <input
                    name={name}
                    type="checkbox"
                    id="toggle"
                    className="option-input checkbox"
                    checked={checked}
                    onChange={onChange} />
                </label>

    );
};

Checkbox.propTypes = {

    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,

};

export default Checkbox;