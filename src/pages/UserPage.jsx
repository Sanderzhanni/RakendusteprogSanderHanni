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
import ItemsCarousel from "react-items-carousel";
import {Link} from "react-router-dom";


class UserPage extends React.PureComponent {

    static propTypes = {
        user: PropTypes.shape(userProptypes),
        dispatch: PropTypes.func.isRequired,
        likedId: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        token: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            liked: [],
            activeItemIndex: 0,
            payments: []
        };
    }

    componentDidMount() {
        const {userId, token} = this.props;
        services.getPayments({userId, token})
            .then(docs => {
               this.setState({
                   payments: docs
               });
            });
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
        let chevronWidth = 30;
        return (
            <>
                <div className={"user-carousel-container"}>
                    <div className={"user-container"}>
                        <h1 className={"user"}>{this.props.user.email.split(/@|. /)[0]}</h1>
                        <div className={"info-container"}>
                            <img src="../../static/img/profile.png" alt="profile image" className={"profile-img"}/>
                            <div className={"email-div"}>
                                <div style={{fontWeight: "bold"}}>email</div>
                                <div>{this.props.user.email}</div>
                            </div>
                            <br/>
                            <div style={{fontSize: "16px"}}> created at: {this.props.user.created_at}</div>
                        </div>
                    </div>

                    <div className={"carousel-container"}>
                        <ItemsCarousel
                            requestToChangeActive={value => this.setState({activeItemIndex: value})}
                            activeItemIndex={this.state.activeItemIndex}
                            numberOfCards={2}
                            gutter={5}
                            leftChevron={<button>{"<"}</button>}
                            rightChevron={<button>{">"}</button>}
                            outsideChevron
                            chevronWidth={chevronWidth}
                        >
                            {this.state.liked.map((item) =>
                                <div key={item._id}>
                                    <Link to={"/items/" + item._id + ""}>
                                    <div>{item.title}</div>
                                    <img src={item.imgSrc} alt={item._id}/>
                                    </Link>
                                </div>
                            )}
                        </ItemsCarousel>
                    </div>
                </div>


                <div className={"payments-container"}>
                    <div>
                        {this.state.payments.map(payment => {
                            return (
                                <div key={payment._id}>
                                    <div>{payment.userId}</div>
                                    <div>{payment.cart.length}</div>
                                    <div>{payment.amount}</div>
                                    <div>{payment.created_at}</div>
                                    <div>======================</div>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>

                <div className="navigation-container">
                    <a className="logout-button" onClick={this.handleLogout}>
                        <AiOutlineLogout size={28} className={"logoutIcon"}/>
                        <span className="logout-span">LOGOUT</span>
                    </a>
                </div>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store),
        likedId: selectors.getLiked(store),
        token: selectors.getToken(store),
        userId: selectors.getUserId(store)
    };
};

export default connect(mapStateToProps)(prodectedRedirect(UserPage));
