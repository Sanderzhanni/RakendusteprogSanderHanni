import React from "react";
import {StripeProvider, CardElement, Elements}  from "react-stripe-elements";

class Stripe extends React.PureComponent{

    render(){
        return(
            <>
                <StripeProvider>
                    <Elements>
                        <form>
                            <CardElement />
                            <button>Pay 100Eur</button>
                        </form>
                    </Elements>
                </StripeProvider>
            </>
        );
    }
}

export default Stripe;