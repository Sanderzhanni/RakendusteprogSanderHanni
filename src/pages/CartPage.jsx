import React from "react";
import PropTypes from "prop-types";
import {MdDeleteForever} from "react-icons/md";
import "./storepage.css";
import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {removeItem} from "../store/actions.js";
import * as selectors from "../store/selectors";
import * as services from "../services";
import Modal from "../components/Modal.jsx";
import Stripe from "../components/Stripe.jsx";

class Cart extends React.PureComponent {

    static propTypes = {
        cartItemId: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    
    

    constructor(props) {
        super(props);
        this.state = {
            related: [],
            cartItems: [],
            categories:  [],
            isModalOpen: false,
            tax: 0,
            withoutTax: 0
        };
    }

    calcSum = () => {
        const VAT = 20;
        let withoutTax = Math.round(this.state.cartItems.reduce((acc, item) => (acc + item.price) * item.count, 0));
        let tax = Math.round(withoutTax / 100 * VAT);
        this.setState({
            tax: tax,
            withoutTax: withoutTax
        });
    };

    handleModal = () =>{
        this.setState({
           isModalOpen: !this.state.isModalOpen
        });
    };

    handleSubmit = () =>{
        this.handleModal();
    };

    handleRemove = (_id) => {
        this.props.dispatch(removeItem(_id));
    };

    componentDidMount() {
        this.fetchItems();
        this.calcSum();
    }

    componentDidUpdate(prevProps) {
        const prevPropId = prevProps.cartItemId.join("");
        const currentId = this.props.cartItemId.join("");
        if(prevPropId !== currentId){
            this.fetchItems();
            this.fetchRelated();
        }
        this.calcSum();
    }

    fetchRelated = () => {
        this.relatedCategories();
        services.getItems()
        .then(items => {
            this.setState({
                related: items.filter((item, i, ) => this.state.categories.includes(item.category)
                    && item._id !== this.state.cartItems[i % this.state.cartItems.length]._id).slice(0, 5)
            });
        })
        .catch(err => {
            console.error(err);
            throw new err;

        });
    };

    relatedCategories = () => {
        let newArray = [];
        this.state.cartItems.forEach(item => {
            if(this.state.categories.indexOf(item.category) === -1){
                newArray.push(item.category);
            }
        });
        return this.setState({
           categories: newArray
        });
    };


    fetchItems = () =>{
        const promises = this.props.cartItemId.map(itemId =>{
            return services.getItem({itemId});
        }

        );
        Promise.all(promises).then(items =>{
            items.forEach(item => item.count = 1);
            this.setState({
                cartItems: items
            });
        })
            .catch(err =>{
                console.log(err);
            });
    };

    handleAmount = (value, id) => {
        const item = this.state.cartItems.filter(item => item._id === id);
        item[0].count = value;
        this.calcSum();
    };


    render() {
        return (
            <>
                <Modal open={this.state.isModalOpen} onClose={this.handleModal}>
                    <Stripe sum={this.state.tax + this.state.withoutTax} onSubmit={this.handleSubmit}/>
                </Modal>
                {!this.state.cartItems.length > 0 &&
                    <div>
                        <div className="shopping-cart">
                            <div className="title">Cart is empty</div>
                        </div>
                    </div>
                }
                {this.state.cartItems.length > 0 &&
                    <div>
                        <div className="shopping-cart">
                            <div className="title">Shopping Cart</div>

                            {this.state.cartItems.filter((item, index, self) => self.indexOf(item) === index).map((row, index) => <ItemPurchase
                                onRemove={this.handleRemove}
                                amount={this.handleAmount}
                                key={index} {...row}
                            />)}
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
                                        <div className="total-price">${this.state.tax}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="total-text">Without Tax:</div>
                                    </td>
                                    <td>
                                        <div className="total-price">${this.state.withoutTax}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="total-text">Total:</div>
                                    </td>
                                    <td>
                                        <div className="total-price">${this.state.tax + this.state.withoutTax}</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="total-btn-div">
                                <button className="total-btn" onClick={this.handleModal}>Format Transaction</button>
                            </div>
                        </div>
                        <div className="related-products">
                            <div className="title" onClick={this.fetchRelated}>Related Products</div>
                            {this.state.related.map((item) => <RelatedItems key={item._id} {...item}/>)}
                        </div>
                    </div>
                }

            </>

        );
    }

}

const ItemPurchase = ({_id, title, imgSrc, category, price, quantity, onRemove, amount}) => {
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
                             onChange={(value) => amount(value, _id)}/>
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
    amount: PropTypes.func.isRequired,
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
        cartItemId: selectors.getCart(store)
    };

};

export default connect(mapStateToProps)(Cart);