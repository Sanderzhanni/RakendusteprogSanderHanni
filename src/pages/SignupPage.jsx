import React from "react";
import "./Form.css";

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
        console.log("submit", this.state);
    }
    render(){
        return(
            <div className="form">
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="email address" name={"email"} onChange={this.handleChange}/>
                    <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                    <input type="password" placeholder="confirm password" name={"confirmPassword"} onChange={this.handleChange}/>
                    <button>create</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                </form>
            </div>
        );
    }
}

export default SignupPage;