import React from "react";
import Header from "./header.jsx";
import ItemList from "./ItemList.jsx";
//import {digitalPianos, bassGuitars} from "./mydatabase.js";

class HomePage extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
        items: [],
        selectedCategory: "Digitaalsed klaverid",
    };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch("http://localhost:9000/api/items")
            .then(res => {
                console.log("res", res);
                return res.json();
            })
            .then(items => {
                //console.log("items", items);
                this.setState({
                    items
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    handleDropdown(e) {
        this.setState({
            selectedCategory: e.target.value,
        });
    //switch (e.target.value) {
    //  case "Digitaalsed klaverid":{
    //    this.setState({
    //      items: digitalPianos,
    //    });
    //    break;
    //  }
    //  case "Basskitarrid": {
    //    this.setState({
    //      items: bassGuitars,
    //    });
    //    break;
    //  }
    //}
    }

    getVisibleItems = () => {
        return this.state.items.filter(item => item.category === this.state.selectedCategory);
    };

  render(){
    return(
      <>
        <Header />
          <select onChange={this.handleDropdown.bind(this)}>
            <option value= "Digitaalsed klaverid" >Digital pianos</option>
            <option value="Basskitarrid">Bass guitars</option>
          </select>
        <ItemList items = {this.getVisibleItems()}/>
      </>

    );
  }
}

export default HomePage;
