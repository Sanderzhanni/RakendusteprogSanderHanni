import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {imgPath} from "./header.jsx";
import * as services from "../services";
import {FaHeart} from "react-icons/fa";

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
                    />;
                })
            }

        </div>
    );
};

ItemList.propTypes = {
    items: PropTypes.array,
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
                            .then((item) => console.log(item) );
                    }

                    }>
                        <span>Vaata <img alt={props.title} src={imgPath + "info.png"} className={"cartIcon"}/></span>

                    </button>
                    <FaHeart id={props.id} size={24}  className={"heartIcon"} onClick={() =>
                        console.log(document.getElementById(`${props.id}`).classList.toggle("heartIconToggeled"))}
                    />

                </div>
            </div>


    );
};

Item.propTypes = {

    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
};

export default ItemList;
