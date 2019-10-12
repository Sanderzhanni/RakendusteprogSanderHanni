import React from "react";
import PropTypes from "prop-types";

class ItemPage extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
        fetch("/api/items/" + this.props.match.params.itemId + "")
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
    console.log(this.props);
    console.log(this.props.match.params.itemId);
    return(
      <>
          <div className="content">
            <div className="product">
              <div>
                <img className="img" src={this.state.imgSrc}/>
                <div className="productTitle">{this.state.title}</div>
                <div className="productPrice">${this.state.price}</div>
              </div>
            </div>
          </div>
      </>

    );
  }
}

ItemPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ItemPage;
