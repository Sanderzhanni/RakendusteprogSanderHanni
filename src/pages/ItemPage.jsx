import React from "react";
import PropTypes from "prop-types";
import {addItem} from "../store.js";

class ItemPage extends React.PureComponent{

  

    constructor(props) {
        super(props);
        this.state = {};
    }
    

    componentDidMount() {
        this.fetchItem();
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
    }

    render() {
    return(
      <>
          <div className="content">
            <div className="product">
              <div>
                <img className="img" src={this.state.imgSrc}/>
                <div className="productTitle">{this.state.title}</div>
                <div className="productPrice">${this.state.price}</div>
                <div><button>osta</button></div>
                <div>{this.props.dispatch(addItem(this.state))}</div>
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

export default ItemPage;
