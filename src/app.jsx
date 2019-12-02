/*jshint esversion: 8 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./store/configureStore.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Router from "./components/Router.jsx";

const {store, persistor} = configureStore();
Modal.setAppElement(root);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer autoClose={2000}/>
                    <Router />
                </PersistGate>
            </Provider>
        );
    }
}


const root = document.getElementById("app");

ReactDOM.render(<App/>, root);
