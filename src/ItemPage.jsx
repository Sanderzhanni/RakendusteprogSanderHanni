import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import {digitalPianos, bassGuitars} from "./mydatabase.js";

class ItemPage extends React.PureComponent{

  render(){
    const item = digitalPianos[0];
    return(
      <>
        <Header />
          <div className="content">
            <div className="product">
              <div>
                <img className="img" src={item.imgSrc}/>
                <div className="productTitle">{item.title}</div>
                <div className="productPrice">{item.price}</div>
              </div>
            </div>
          </div>
      </>

    );
  }
}

export default ItemPage;
