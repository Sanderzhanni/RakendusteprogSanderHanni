import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {imgPath} from "./header.jsx";
import * as services from "../services";
import {FaHeart} from "react-icons/fa";
import {connect} from "react-redux";
import {addItem, addItemToLiked, removeItemLiked} from "../store/actions";
import * as selectors from "../store/selectors";


const ItemList = (props) => {
    return (
        <div className="content">
            {
                props.items.map(item => {
                    return <Item
                        key={item._id}
                        id={item._id}
                        imgSrc={item.imgSrc}
                        title={item.title}
                        price={item.price}
                        quantity={1}
                        dispatch={props.dispatch}
                        liked={props.liked}
                    />;
                })
            }

        </div>
    );
};

ItemList.propTypes = {
    items: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    liked: PropTypes.func.isRequired,
};

const Item = (props) => {

    return (

            <div className="product">
                <Link to={"/items/" + props.id + ""}>
                    <img className="img" src={props.imgSrc}/>
                    <div className="productTitle">{props.title}</div>
                </Link>
                <div className="productId">{props.id}</div>
                <div className="productPrice">
                    <span className={"priceb"}>{props.price} €</span>
                    <button className={"cartText"} onClick={()=>{
                        services.getItem({itemId: props.id})
                            .then((item) => props.dispatch(addItem(item)) );
                    }

                    }>
                        <span>Lisa <img alt={props.title} src={imgPath + "cart_white.png"} className={"cartIcon"}/></span>

                    </button>

                    <FaHeart id={props.id} size={24} className={"heartIcon"} onClick={() =>
                    {
                        document.getElementById(`${props.id}`).classList.toggle("heartIconToggeled");
                        addOrRemoveItemFromLiked(props);
                    }
                    }/>

                </div>
            </div>


    );
};

// const check = (props) =>{
//     console.log(document.getElementById(`${props.id}`));
//   if(props.liked.includes(props.id)) console.log(document.getElementById(`${props.id}`));
// };

export const addOrRemoveItemFromLiked = (props) =>{
    console.log(props.id);
    services.getItem({itemId: props.id})
        .then((item) => {
            if(!props.liked.includes(props.id)) return props.dispatch(addItemToLiked(item));
            props.dispatch(removeItemLiked(props.id));
        });
    console.log(props.liked);
};

Item.propTypes = {

    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    liked: PropTypes.func.isRequired,
};

const mapStateToProps = (store) =>{
    return {
        dispatch: PropTypes.func.isRequired,
        liked: selectors.getLiked(store)
    };
};

export default connect(mapStateToProps)(ItemList);
