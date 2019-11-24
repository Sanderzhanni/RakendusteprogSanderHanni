import React from "react";
import "./Form.css";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {userUpdate, tokenUpdate} from "../store/actions";
import {toast} from "react-toastify";
import * as services from "../services";

class LoginPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        services.login(this.state)
        .then(this.handleSuccess)
        .catch(err => {
            console.log("err", err);
            toast.error("Sisselogimine ebaõnnestus", {position: "top-center", pauseOnHover: false});
        });
    };

    handleSuccess = ({user, token}) => {
        this.props.dispatch(userUpdate(user));
        this.props.dispatch(tokenUpdate(token));
        this.props.history.push("/users/" + user._id);
    };

    render() {
        return (
            <>
                <div><h1 style={{textAlign: "center"}}>LoginPage</h1></div>
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button>login</button>
                        <p className="message">Not registered?
                            <Link to={"/signup"}> Create an account</Link>
                        </p>
                    </form>
                </div>
            </>
        );
    }
}

export default connect()(LoginPage);