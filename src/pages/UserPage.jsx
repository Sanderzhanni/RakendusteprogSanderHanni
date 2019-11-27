import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {userProptypes} from "../store/reducer";
import {tokenUpdate, userUpdate} from "../store/actions";
import prodectedRedirect from "../components/prodectedRedirect.jsx";
import * as selectors from "../store/selectors";
import "./userPage.css";
import {AiOutlineLogout} from "react-icons/ai";
import {ItemProps} from "./CartPage.jsx";
import * as services from "../services";


class UserPage extends React.PureComponent {

    static propTypes = {
        user: PropTypes.shape(userProptypes),
        dispatch: PropTypes.func.isRequired,
        likedId: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            liked: [],
        };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () =>{
        const promises = this.props.likedId.map(itemId =>
            services.getItem({itemId})
        );
        Promise.all(promises).then(items =>{

            this.setState({
                liked: items
            });
        })
            .catch(err =>{
                console.log(err);
            });
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
                    <a className="button" onClick={this.handleLogout}>
                             <AiOutlineLogout size={28} className={"logoutIcon"}/>
                            <span className="logout" >LOGOUT</span>
                    </a>
                </div>
                {this.state.liked.map(item => <LikedItems key={item._id} {...item}/>)}
            </>
        );
    }
}

const LikedItems = ({_id, title, imgSrc, category, price,}) =>{
    return(
      <>
          <div>{_id}</div>
          <div>{title}</div>
          <img src={imgSrc} alt="_id"/>
          <div>{category}</div>
          <div>{price}</div>
      </>
    );
};

LikedItems.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store),
        likedId: selectors.getLiked(store)
    };
};

export default connect(mapStateToProps)(prodectedRedirect(UserPage));
