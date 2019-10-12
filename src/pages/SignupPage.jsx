import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";

class SignupPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            confirmPassword:"",
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
        fetch("/api/users/signup", {
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
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email address" name={"email"} onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                    <input type="password" placeholder="confirm password" name={"confirmPassword"} onChange={this.handleChange}/>
                    <button>create</button>
                    <p className="message">Already registered? <Link to={"/login"}>Login</Link></p>
                </form>
            </div>
        );
    }
}

export default SignupPage;