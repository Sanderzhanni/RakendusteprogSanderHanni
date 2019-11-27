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
import Modal from "react-modal";

const customStyles = {
    content : {
        top                   : "50%",
        left                  : "50%",
        right                 : "auto",
        bottom                : "auto",
        marginRight           : "-50%",
        transform             : "translate(-50%, -50%)"
    }
};

class Cart extends React.PureComponent {

    static propTypes = {
        cartItemId: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    
    

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            related: [],
            cartItems: [],
            categories:  [],
            showModal: false
        };
    }

    calcSum = () => {
        const VAT = 20;
        const withoutTax = Math.round(this.state.cartItems.reduce((acc, item) => acc + item.price, 0));
        const tax = Math.round(withoutTax / 100 * VAT);
        return {
            withoutTax, tax
        };
    };

    handleClick = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal= () => {
        this.setState({ showModal: false });
    };

    handleRemove = (_id) => {
        this.props.dispatch(removeItem(_id));
    };

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps) {
        const prevPropId = prevProps.cartItemId.join("");
        const currentId = this.props.cartItemId.join("");
        if(prevPropId !== currentId){
            this.fetchItems();
            this.fetchRelated();
        }
    }

    fetchRelated = () => {
        this.relatedCategories();
        services.getItems()
        .then(items => {
            this.setState({
                related: items.filter(item => this.state.categories.includes(item.category)).slice(0, 5)
            });
        })
        .catch(err => {
            throw new err;
        });
    };

    relatedCategories = () => {
        let newArray = [];
        this.state.cartItems.forEach(item => {
            if(this.state.categories.indexOf(item.category) === -1){
                newArray.push(item.category);
                console.log(newArray);
            }
        });
        return this.setState({
           categories: newArray
        });
    };


    fetchItems = () =>{
        const promises = this.props.cartItemId.map(itemId =>
            services.getItem({itemId})
        );
        Promise.all(promises).then(items =>{

            this.setState({
                cartItems: items
            });
        })
            .catch(err =>{
                console.log(err);
            });
    };



    handleAmount = (value, _id) =>{
        return (_id, value);
    };

    render() {
        const {tax, withoutTax} = this.calcSum();
        return (
            <>
                <Modal isOpen={this.state.showModal} style={customStyles}>
                    <div>Hello world</div>
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </Modal>
                <div className="shopping-cart">
                    <div className="title">Shopping Cart</div>
                    {this.state.cartItems.filter((item, index) => this.state.cartItems.indexOf(item) === index).map((row, index) => <ItemPurchase
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
                <button onClick={this.fetchRelated}>related</button>
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
                             onChange={() => console.log(_id)}/>
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