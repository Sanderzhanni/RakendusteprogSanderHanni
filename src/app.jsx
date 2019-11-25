/*jshint esversion: 8 */
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./store/configureStore.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import Header from "./components/header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StorePage from "./pages/CartPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import NotFound from "./pages/NotFound.jsx";

const {store, persistor} = configureStore();
Modal.setAppElement(root);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer autoClose={2000}/>
                    <BrowserRouter>
                        <Route path={"/"} component={Header}/>
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/login" exact component={LoginPage}/>
                            <Route path="/signup" exact component={SignupPage}/>
                            <Route path={"/cart"} component={StorePage}/>
                            <Route path="/users/:userId" exact component={UserPage}/>
                            <Route path="/items/:itemId" exact component={ItemPage}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}


const root = document.getElementById("app");

ReactDOM.render(<App/>, root);
