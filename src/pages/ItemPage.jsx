import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addItem} from "../store/store.js";

class ItemPage extends React.PureComponent{

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

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

    handleBuy = () => {
      console.log("buy");
      this.props.dispatch(addItem(this.state));
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
                <div><button onClick={this.handleBuy}>osta</button></div>
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

export default connect()(ItemPage);
