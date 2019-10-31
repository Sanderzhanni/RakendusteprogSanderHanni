import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SignupPage extends React.PureComponent{

    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
        };
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        fetch("/api/v1/auth/signup", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res =>{
            res.json();
        })
        .then( () =>{
            this.props.history.push("/login");
        })
        .catch((err) =>{
            console.log("err", err);
        });
    }
    render() {
        return (
            <>
                <div><h1 style={{ textAlign: "center" }}>SignupPage</h1></div>
                <div className="form">
                    <form className="register-form" onSubmit={this.handleSubmit}>
                        <input type="email" placeholder="email address" name={"email"} onChange={this.handleChange} />
                        <input type="password" placeholder="password" name={"password"} onChange={this.handleChange} />
                        <button>create</button>
                        <p className="message">Already registered? <Link to={"/login"}>Login</Link></p>
                    </form>
                </div>
            </>
        );
    }
}

export default SignupPage;