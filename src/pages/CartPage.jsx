import React from "react";
import {getItems} from "../actions/itemsActions.js";
import PropTypes from "prop-types";
import {MdDeleteForever} from "react-icons/md";
import "./storepage.css";
import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {removeItem} from "../store/actions.js";
import {toast} from "react-toastify";

class Cart extends React.PureComponent {

    static propTypes = {
        cart: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            related: [],
        };
    }

    calcSum = () => {
        const VAT = 20;
        const withoutTax = Math.round(this.props.cart.reduce((acc, item) => acc + item.price, 0));
        const tax = Math.round(withoutTax / 100 * VAT);
        return {
            withoutTax, tax
        };
    };

    handleClick = () => {
        console.log("Format button");
    };

    handleRemove = (_id) => {
        toast.success("toode eemaldatud");
        this.props.dispatch(removeItem(_id));
    };

    componentDidMount() {
        getItems()
            .then(items => {
                this.setState({
                    related: (items.filter(item => !this.props.cart.includes(item))).slice(0, 5),
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    render() {
        const {tax, withoutTax} = this.calcSum();
        return (
            <>

                <div className="shopping-cart">
                    <div className="title">Shopping Cart</div>
                    {this.props.cart.map((row, index) => <ItemPurchase onRemove={this.handleRemove}
                                                                       key={index} {...row} />)}
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
                            <td>
                                <div className="total-text">Tax:</div>
                            </td>
                            <td>
                                <div className="total-price">${tax}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="total-text">Without Tax:</div>
                            </td>
                            <td>
                                <div className="total-price">${withoutTax}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="total-text">Total:</div>
                            </td>
                            <td>
                                <div className="total-price">${tax + withoutTax}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="total-btn-div">
                        <button className="total-btn" onClick={this.handleClick}>Format Transaction</button>
                    </div>
                </div>

                <div className="related-products">
                    <div className="title">Related Products</div>
                    {this.state.related.map((item) => <RelatedItems key={item._id} {...item}/>)}
                </div>
            </>

        );
    }

}

const ItemPurchase = ({_id, title, imgSrc, category, price, quantity, onRemove}) => {
    return (
        <div className="item">
            <div className="buttons">
                <button className="delete-btn" onClick={() => onRemove(_id)}><MdDeleteForever size={28}/></button>
            </div>
            <img src={imgSrc} className="image" alt={title}/>
            <div className="description">
                <span>{title}</span>
                <span>{category}</span>
            </div>
            <div className="quantity">
                <InputNumber defaultValue={1} min={1} max={quantity}
                             onChange={(value) => console.log("Amount:", value, "/", quantity)}/>
            </div>
            <div className="price">${price}</div>
        </div>
    );
};

const RelatedItems = ({title, imgSrc, _id}) => {
    return (
        <Link to={"/items/" + _id}>
            <div className="related-product">
                <img src={imgSrc} className="related-image"/>
                <div className="description">{title}</div>
            </div>
        </Link>
    );
};

ItemPurchase.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
};

RelatedItems.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
};

export const ItemProps = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => {
    return {
        cart: store.cart,
    };

};

export default connect(mapStateToProps)(Cart);