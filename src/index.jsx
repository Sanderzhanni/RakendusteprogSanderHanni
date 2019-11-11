/*jshint esversion: 8 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store/store.js";
import Header from "./components/header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StorePage from "./pages/CartPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import NotFound from "./pages/NotFound.jsx";

const auth_default_value = {
  token: null,
    user:{
      email: null,
      _id: null,
      created_at: null,
    },
};

export const Auth_context = React.createContext(auth_default_value);

class App extends React.Component{

  state = auth_default_value;

  handleLogin = ({token, user}) =>{
    this.setState({
      user, token
    });
  };



  render() {
    return (

      <Provider store={store}>
        <Auth_context.Provider value={this.state}>
        <BrowserRouter>

          <Route path={"/"} component={Header}/>

          <Switch>

            <Route path="/" exact component={HomePage} />
            <Route
              path="/login"
              exact
              render={(props) => <LoginPage {...props} onLogin={this.handleLogin} />}
            />
            <Route path="/signup" exact component={SignupPage} />
            <Route path={"/cart"} component={StorePage}/>
            <Route path="/users/:userId" exact component={UserPage}/>
            <Route path="/items/:itemId" exact component={ItemPage} />

            <Route component={NotFound} />

          </Switch>

        </BrowserRouter>
      </Auth_context.Provider>
      </Provider>

      

    );
  }
}


const root = document.getElementById("app");

ReactDOM.render( <App /> ,root);
