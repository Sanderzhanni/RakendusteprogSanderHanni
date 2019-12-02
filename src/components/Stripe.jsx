import React from "react";
import {StripeProvider, Elements, CardElement}  from "react-stripe-elements";
import "./stripe.css";
import {injectStripe} from "react-stripe-elements";
import PropTypes from "prop-types";
import * as services from "../services";
import {connect} from "react-redux";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";

class Stripe extends React.PureComponent{

    static propTypes = {
        sum: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    render(){
        return(
            <>
                    <StripeProvider apiKey="pk_test_0Dayl8nIf2v46j6hM63DKDM3004Hy9si1Y">
                        <Elements>
                            <InjectedStripeForm sum={this.props.sum} onSubmit={this.props.onSubmit}/>
                        </Elements>
                    </StripeProvider>
            </>
        );
    }
}

export default Stripe;

class StripeForm extends React.PureComponent{

    static propTypes = {
        stripe: PropTypes.object.isRequired,
        sum: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.stripe.createToken()
            .then( ({error, token}) => {
                if(error){
                  console.log("token error", error);
                  return;
                }
                services.checkout({ stripeToken:token, userId: this.props.userId, token: this.props.token})
                    .then(x => {
                        console.log(x);
                        this.props.dispatch(actions.refreshUser());
                        this.props.onSubmit();
                    })
                    .catch(err => console.error(err));
            });

    };

    render(){
        return(
            <form className={"stripe-form"} onSubmit={this.handleSubmit}>
                <label>
                    Card details
                    <CardElement style={{base: {fontSize: "18px"}}} />
                </label>
                <button className={"stripe-pay-button"}>Pay {this.props.sum}€</button>
            </form>
        );
        
    }
}

const mapStateToProps = (store) =>{
    return{
        userId: selectors.getUserId(store),
        token: selectors.getToken(store)
    };
};

const InjectedStripeForm = connect(mapStateToProps)(injectStripe(StripeForm));