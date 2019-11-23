import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import {toast} from "react-toastify";
import "../components/itempage.css";


class ItemPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        this.fetchItem();

        toast.configure({
            autoClose: 100,
            draggable: false,
            //etc you get the idea
        });
    }

    fetchItem = () => {
        fetch("/api/v1/items/" + this.props.match.params.itemId + "")
            .then(res => {

                return res.json();
            })
            .then(item => {

                this.setState({
                    ...item
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    };

    handleBuy = () => {
        toast.success("toode lisatud", {hideProgressBar: true, position: "bottom-right"});
        this.props.dispatch(addItem(this.state));
    };

    render() {
        return (
            <>
                <div className="content">
                    <div className="product-item">
                        <div>
                            <div className="title-item">{this.state.title}
                                <hr/>
                            </div>
                            <div className="container-item">
                                <img className="image-item" src={this.state.imgSrc}/>
                                <div className="description-item">Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                                <div className="price-item">${this.state.price}</div>
                                <button className="btn-item" onClick={this.handleBuy}>Lisa korvi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

ItemPage.propTypes = {
    match: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(ItemPage);
