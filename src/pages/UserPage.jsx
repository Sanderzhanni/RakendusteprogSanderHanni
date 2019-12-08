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
            payments: [],
            activeItemIndex: 0,
        };
    }

    componentDidMount() {
        this.fetchItems();
        const {userId, token} = this.props;
        services.getPayments({userId, token})
            .then(docs => {
                this.setState({
                    payments: docs
                });
            });
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
                <div className={"Container"}>
                    <div className={"profile-header"}>Minu konto</div>
                    <div className={"user-data-title"}>Kasutaja andmed</div>
                    <div className={"user-data"}>
                        <p className={"col-1-row-1"}>Email</p>
                        <p className={"col-2-row-1"}>{this.props.user.email}</p>
                        <p className={"col-1-row-2"}>Created at</p>
                        <p className={"col-2-row-2"}>{this.props.user.created_at}</p>
                    </div>

                    <div className={"favourite-items-title"}>Lemmiktooted</div>

                    <div className={"favourite-items"}>
                    {this.state.liked.length < 3 &&
                        <div className={"favourite-items-few"}>
                            {this.state.liked.map((item, index) =>
                                <div key={index} >
                                    <Link to={"/items/" + item._id + ""}>
                                        <div className={"favourite-items-few-title"}>{item.title}</div>
                                        <img src={item.imgSrc} alt={item._id}/>
                                    </Link>
                                </div>
                            )}
                        </div>
                    }
                    {this.state.liked.length > 2 &&
                        <div>
                            <div className={"favourite-items-many"}>
                                <ItemsCarousel
                                    requestToChangeActive={value => this.setState({activeItemIndex: value})}
                                    activeItemIndex={this.state.activeItemIndex}
                                    numberOfCards={4}
                                    gutter={2}
                                    leftChevron={<button className={"chevron-button"}>{"<"}</button>}
                                    rightChevron={<button className={"chevron-button"}>{">"}</button>}
                                    activePosition={"center"}

                                    outsideChevron
                                    chevronWidth={60}

                                >
                                    {this.state.liked.map((item, index) =>
                                        <div key={index} className={"favourite-items-few"}>
                                            <Link to={"/items/" + item._id + ""}>
                                                <div className={"favourite-items-few-title"}>{item.title}</div>
                                                <img src={item.imgSrc} alt={item._id}/>
                                            </Link>
                                        </div>
                                    )}
                                </ItemsCarousel>
                            </div>
                        </div>
                    }
                </div>
                    <div className={"favourite-items-title"}>Tellimused</div>
                    <table className={"payments-table"}>
                        <tr>
                            <th>Kogus</th>
                            <th>Summa</th>
                            <th>Kuupäev</th>
                            <th>Toote kood</th>
                        </tr>
                    {this.state.payments.map(payment => {
                        return (
                            <tr key={payment._id}>
                                <td>{payment.cart.length}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.created_at}</td>
                                <td style={{"width":"50%"}}><Link to={"/items/" + payment.cart + ""}>{payment.cart.join(", ")}</Link></td>
                            </tr>
                        );
                    })
                    }
                    </table>

                        <div className={"logout-button"} onClick={this.handleLogout}>
                            <AiOutlineLogout size={28} className={"logoutIcon"}/>
                            <span className="logout-span">LOGOUT</span>
                        </div>

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
