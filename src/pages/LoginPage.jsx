import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class LoginPage extends React.PureComponent{

    static propTypes = {
        history: PropTypes.object.isRequired,
        onLogin: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
        };
    }

    handleChange = (e) =>{
        //console.log("event ", e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        //console.log("submit", this.state);
        fetch("/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then( res =>(res.json()))
        .then(({token, user}) =>{
            console.log("respone", token, user);
            this.props.onLogin({token, user});
            this.props.history.push("/users/" + user._id);
        })
        .catch(err =>{
            console.log("erorr", err);
        });
    }

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

export default LoginPage;