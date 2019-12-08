import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import {toast} from "react-toastify";
import "../components/itempage.css";
import * as services from "../services";
import {FaHeart} from "react-icons/fa";
import {addOrRemoveItemFromLiked} from "../components/ItemList.jsx";
import * as selectors from "../store/selectors";


class ItemPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        liked: PropTypes.func.isRequired,
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

    componentDidUpdate() {
        this.getLiked();
    }

    getLiked = () =>{
        this.props.liked.forEach((item) =>{
            try {
                console.log(document.getElementById(`${item}`));
                document.getElementById(`${item}`).classList.add("heartIconToggeled");
            }
            catch(error) {

                // Lmao see hackjob aga toimib :PPPPPP
            }
        });
    };

    fetchItem = () => {
        services.getItem({itemId: this.props.match.params.itemId})
        .then(item => {

            this.setState({
                ...item,
                liked: this.props.liked
            });
        })
        .catch(err => {
            console.log("err", err);
        });
    };

    handleBuy = () => {
        this.props.dispatch(addItem(this.state));
    };

    render() {
        return (
            <>
                <div className="Container">
                    <div className="product-item">
                        <div>
                            </div>
                            <div className="container-item">
                                <div className="title-item">{this.state.title}</div>
                                <div className="product-id">Tootekood: {this.state._id}</div>
                                <img className="image-item" src={this.state.imgSrc}/>
                                <div className="price-item">${this.state.price}</div>
                                <button className="btn-item" onClick={this.handleBuy}>Lisa korvi</button>
                                <FaHeart id={this.state._id} size={35} className={"heart-item"} onClick={() =>
                                {
                                    document.getElementById(`${this.state._id}`).classList.toggle("heartIconToggeled");
                                    addOrRemoveItemFromLiked({liked: this.state.liked, id:this.state._id, dispatch:this.props.dispatch});
                                }
                                }/>
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

const mapStateToProps = (store) =>{
    return {
        dispatch: PropTypes.func.isRequired,
        liked: selectors.getLiked(store)
    };
};

export default connect(mapStateToProps)(ItemPage);
