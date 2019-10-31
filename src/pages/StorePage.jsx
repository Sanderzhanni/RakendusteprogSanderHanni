import React from "react";
import { getItems } from "../actions/itemsActions.js";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import { MdDeleteForever} from "react-icons/md";
import "./storepage.css";



class Store extends React.PureComponent{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      rows: [],
    };
  }

  handleClick = ()=> {
    console.log("sth");
  }

  componentDidMount(){
    getItems()
    .then(items =>{
      this.setState({
        rows: items.slice(0,4),
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
        </>
  
      );
    }

}

const ItemPurchase = ({title, imgSrc, category, price, quantity}) =>{
  return (
      <div className="item">
        <div className="buttons">
          <button className="delete-btn"><MdDeleteForever size={32}/></button>
        </div>
        <img src={imgSrc} className="image" />
        <div className="description">
          <span>{title}</span>
          <span>{category}</span>
        </div>
        <div className="quantity">
          <button className="plus-btn" type="button" name="button" onClick={()=>{quantity++;console.log(quantity);}}>
            < IoIosArrowUp/>
          </button>
          <input type="text" name="quantity" value={quantity}></input>
          <button className="minus-btn" type="button" name="button" onClick={()=>{quantity++;console.log(quantity);}}>
          < IoIosArrowDown/>
          </button>
        </div>
        <div className="price">${price}</div>
      </div>
  );
};

ItemPurchase.propTypes ={
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category:PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default Store;