import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {userProptypes} from "../store/reducer";

const prodectedRedirect = (WrappedComponent) => {
    return class extends React.PureComponent {
        static displayName = "prodected-redirect-hoc";
        static propTypes = {
            user: PropTypes.shape(userProptypes),
        };

        render() {
            if (!this.props.user) return <Redirect to={"/"}/>;
            return (
                <WrappedComponent {...this.props}/>
            );

        }
    };
};


export default prodectedRedirect;