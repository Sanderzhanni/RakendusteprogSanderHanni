import React from "react";
import PropTypes from "prop-types";

class UserPage extends React.PureComponent{

    static propTypes = {
        user: PropTypes.object.isRequired,
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

export default UserPage;