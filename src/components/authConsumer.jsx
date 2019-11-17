import React from "react";
import { Auth_context } from "../app.jsx";

const auth_consumer = (WrappedComponent) =>{
    return class extends React.PureComponent{
        static displayName = "auth_consumer-hoc";
        render(){
            return(
                <Auth_context.Consumer>
                    {
                        (value) => <WrappedComponent {...this.props} {...value}/>
                    }
                </Auth_context.Consumer>
            );
        }
    };
};

export default auth_consumer;