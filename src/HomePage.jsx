import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import {digitalPianos, bassGuitars} from "./mydatabase.js";

class HomePage extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
      items: digitalPianos,
    }
  }

  handleChange(e){
    switch (e.target.value) {
      case "Digitaalsed klaverid":{
        this.setState({
          items: digitalPianos,
        });
        break;
      }
      case "Basskitarrid": {
        this.setState({
          items: bassGuitars,
        });
        break;
      }
    }
  }

  render(){
    return(
      <>
        <Header />
          <select onChange={this.handleChange.bind(this)}>
            <option value="Digitaalsed klaverid">Digital pianos</option>
            <option value="Basskitarrid">Bass guitars</option>
          </select>
        <ItemList items = {this.state.items}/>
      </>

    );
  }
}

export default HomePage;
