import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { userProptypes } from "../store/reducer";
import { tokenUpdate, userUpdate } from "../store/actions";
//import auth_consumer from "../components/authConsumer.jsx";
//import prodectedRedirect from "../components/prodectedRedirect.jsx";

class UserPage extends React.PureComponent{

    static propTypes = {
        user: PropTypes.shape(userProptypes),
        dispatch: PropTypes.func.isRequired,
    }

    handleLogout = () => {
        this.props.dispatch(tokenUpdate(null));
        this.props.dispatch(userUpdate(null));
    };
    render(){
        return(
            <>
            <div>
               <h1>Info</h1>
               <ul>
                    <li>email: {this.props.user.email}</li>
                    <li> created at: {this.props.user.created_at}</li>
               </ul>
              
            </div>
            <div><button onClick={this.handleLogout}>log out</button></div>
            </>
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