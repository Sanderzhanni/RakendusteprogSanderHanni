import React from "react";
import "./Form.css";

class LoginPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            username:"",
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
    }

    render(){
        return(
            <div className="form">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="username" 
                    name="username"
                    value={this.state.username} 
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
                        <a href="#">Create an account</a>
                    </p>
                </form>
            </div>
        );
    }
}

export default LoginPage;