import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./header.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import StorePage from "../pages/CartPage.jsx";
import UserPage from "../pages/UserPage.jsx";
import UserPayments from "../pages/UserPayments.jsx";
import ItemPage from "../pages/ItemPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";

class Router extends React.PureComponent{

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const user = this.props.userId;
        if(user){
            this.props.dispatch(actions.refreshUser());
        }
    }


    render(){
        return(
            <>
                <BrowserRouter>
                    <Route path={"/"} component={Header}/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/signup" exact component={SignupPage}/>
                        <Route path={"/cart"} component={StorePage}/>
                        <Route path="/users/:userId" exact component={UserPage}/>
                        <Route path="/users/:userId/payments" exact component={UserPayments}/>
                        <Route path="/items/:itemId" exact component={ItemPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </>
        );
    }

}

const mapStateToProps = (store) => {
    return {
        userId: selectors.getUserId(store)
    };

};

export default connect(mapStateToProps)(Router);
