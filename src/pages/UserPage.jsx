import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { userProptypes } from "../store/reducer";
//import auth_consumer from "../components/authConsumer.jsx";
//import prodectedRedirect from "../components/prodectedRedirect.jsx";

class UserPage extends React.PureComponent{

    static propTypes = {
        user: PropTypes.shape(userProptypes),
    }
    render(){
        return(
            <div>
               <h1>Info</h1>
               <ul>
                    <li>email: {this.props.user.email}</li>
                    <li> created at: {this.props.user.created_at}</li>
               </ul>
              
            </div>
        );
    }
}

const mapStateToProps = (store) =>{
    return {
        user:store.user,
    };
};

export default connect(mapStateToProps)(UserPage);

//export default auth_consumer(prodectedRedirect(UserPage));