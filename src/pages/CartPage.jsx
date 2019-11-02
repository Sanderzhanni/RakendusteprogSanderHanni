import React from "react";
import { getItems } from "../actions/itemsActions.js";
import PropTypes from "prop-types";
import { MdDeleteForever} from "react-icons/md";
import "./storepage.css";
import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
import { Link } from "react-router-dom";





class Cart extends React.PureComponent{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      rows: [],
      related: [],
      items: []
    };
  }

  handleClick = ()=> {
    console.log("Format button");
  }

  onSelect = key => {
    this.setState({ selected: key });
  }

  componentDidMount(){
    getItems()
    .then(items =>{
      this.setState({
        rows: items.slice(0,4),
        items,
        related: (items.filter(item => !items.slice(0,4).includes(item.category) && !items.slice(0,4).includes(item))).slice(0,5),
      });
    })
    .catch( err => {
      console.log("err", err);
    });
  }

      render() {
      return(
        <>    
               
                <div className="shopping-cart">
                  <div className="title">Shopping Cart</div>
                  {this.state.rows.map((row) => <ItemPurchase key={row._id} {...row} />)}
                </div>
                <div className="total">
                <div className="title">Total</div>
                <table>
                  <tbody>
                <tr>
                  <th></th>
                  <th></th> 
                </tr>
                <tr>
                  <td><div className="total-text">Tax:</div></td>
                  <td><div className="total-price">$2000</div></td>
                </tr>
                <tr>
                  <td><div className="total-text">Without Tax:</div></td>
                  <td><div className="total-price">$4000</div></td>
                </tr>
                <tr>
                  <td><div className="total-text">Total:</div></td>
                  <td><div className="total-price">$6000</div></td>
                </tr>
                </tbody>                        
                </table>
                <div className="total-btn-div">
                  <button className="total-btn" onClick={this.handleClick}>Format Transaction</button>
                </div>  
              </div>

              <div  className="related-products">
                <div className="title">Related Products</div>
                {this.state.related.map( (item) => <RelatedItems key={item._id} {...item}/> )}
              </div>
        </>
  
      );
    }

}

const ItemPurchase = ({title, imgSrc, category, price, quantity}) =>{
  return (
      <div className="item">
        <div className="buttons">
          <button className="delete-btn"><MdDeleteForever size={28}/></button>
        </div>
        <img src={imgSrc} className="image" />
        <div className="description">
          <span>{title}</span>
          <span>{category}</span>
        </div>
        <div className="quantity">
          <InputNumber defaultValue={1} min={1} max={quantity}/>
        </div>
        <div className="price">${price}</div>
      </div>
  );
};

const RelatedItems = ({title, imgSrc, _id}) =>{
  return(
    <Link to={"/items/"+_id+""}>
      <div className="related-product">
        <img src={imgSrc} className="related-image" />
        <div className="description">{title}</div>
      </div>
    </Link>
  );
};

ItemPurchase.propTypes ={
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category:PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

RelatedItems.propTypes ={
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};



export default Cart;