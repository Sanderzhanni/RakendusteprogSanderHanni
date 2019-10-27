/*jshint esversion: 8 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route} from "react-router-dom";

import Header from "./components/header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";

class App extends React.Component{

  state ={
    token: null,
    user:{
      email: null,
      _id: null,
      created_at: null
    },
  }

  handleLogin = ({token, user}) =>{
    this.setState({
      user, token
    });
  };


  render(){
    return(
      <BrowserRouter>
        <Route 
          path={"/"} 
          render = { (props) => <Header {...props} token={this.state.token} user={this.state.user}/>}
        />
        <Route path="/" exact component={HomePage} />
        <Route 
          path="/login" 
          exact
          render={ (props) => <LoginPage {...props} onLogin={this.handleLogin}/>}
        />
        <Route path="/signup" exact component={SignupPage} />
        <Route 
          path="/users/:userId" 
          exact 
          render = { (props) => <UserPage {...props} user={this.state.user}/>}
        />
        <Route path="/items/:itemId" exact component={ItemPage} />
      </BrowserRouter>
    );
  }
}


const root = document.getElementById("app");

ReactDOM.render( <App /> ,root);
