import React from "react";
import {StripeProvider, Elements, CardElement}  from "react-stripe-elements";
import "./stripe.css";
import {injectStripe} from "react-stripe-elements";
import PropTypes from "prop-types";

class Stripe extends React.PureComponent{

    static propTypes = {
        sum: PropTypes.number.isRequired,
    };

    render(){
        return(
            <>
                    <StripeProvider apiKey="pk_test_0Dayl8nIf2v46j6hM63DKDM3004Hy9si1Y">
                        <Elements>
                            <InjectedStripeForm sum={this.props.sum}/>
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
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.stripe.createToken()
            .then( result => console.log(result));
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

const InjectedStripeForm = injectStripe(StripeForm);