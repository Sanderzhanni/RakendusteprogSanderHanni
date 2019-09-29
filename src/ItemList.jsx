import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";



const ItemList = (props) => {
  return(
    <div className = "content">
      {
        props.items.map(item =>{
          return <Item
              key={item.id}
              id={item.id}
            imgSrc={item.imgSrc}
            title={item.title}
            price={item.price}
          />;
        })
      }

    </div>
  );
};

ItemList.propTypes = {
    items: PropTypes.array
};

const Item = (props) =>{
  return(
    <Link to={"/items/"+props.id+""}>
    <div className="product">
        <img className="img" src={props.imgSrc}/>
        <div className="productTitle">{props.title}</div>
        <div className="productPrice">${props.price}</div>
    </div>
    </Link>

  );
};

Item.propTypes = {

    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string
};

export default ItemList;
