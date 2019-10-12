import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";

class LoginPage extends React.PureComponent{

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
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res =>{
            console.log("respone", res);
        })
        .catch(err =>{
            console.log("erorr", err);
        });
    }

    render(){
        return(
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
        );
    }
}

export default LoginPage;