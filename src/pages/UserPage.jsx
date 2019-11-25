import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {userProptypes} from "../store/reducer";
import {tokenUpdate, userUpdate} from "../store/actions";
import prodectedRedirect from "../components/prodectedRedirect.jsx";
import * as selectors from "../store/selectors";
import "./userPage.css";
import {AiOutlineLogout} from "react-icons/ai";


class UserPage extends React.PureComponent {

    static propTypes = {
        user: PropTypes.shape(userProptypes),
        dispatch: PropTypes.func.isRequired,
    };

    handleLogout = () => {
        this.props.dispatch(tokenUpdate(null));
        this.props.dispatch(userUpdate(null));
    };

    render() {
        return (
            <>
                <div className={"userContainer"}>
                <h1 className={"user"}>{this.props.user.email.split(/@|. /)[0]}</h1>
                <div className={"InfoContainer"}>

                        <img src="../../static/img/profile.png" alt="profile image" className={"profileImg"}/>
                        <div className={"emailDiv"}>
                            <div style={{fontWeight: "bold" }}>email</div>
                            <div>{this.props.user.email}</div>
                        </div>
                    <br/>
                        <div style={{fontSize: "16px"}}> created at: {this.props.user.created_at}</div>


                </div>
                </div>
                <div className="navigation">

                    <a className="button" href="" onClick={this.handleLogout}>
                             <AiOutlineLogout size={28} className={"logoutIcon"}/>
                            <span className="logout" >LOGOUT</span>
                    </a>

                </div>

            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store)
    };
};

export default connect(mapStateToProps)(prodectedRedirect(UserPage));
