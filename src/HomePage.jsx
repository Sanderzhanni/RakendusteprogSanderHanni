import React from "react";
import Header from "./header.jsx";
import ItemList from "./ItemList.jsx";
//import {digitalPianos, bassGuitars} from "./mydatabase.js";
import Checkbox from "./Checkbox.jsx";

class HomePage extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
        items: [],
        allCategories: ["Digitaalsed klaverid", "Basskitarrid"],
        selectedCategories: ["Digitaalsed klaverid"],
    };
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        fetch("/api/items")
            .then(res => {
                //console.log("res", res);
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

    handleDropdown = (e) => {
        console.log(e);
        if (this.isSelected(e.target.name)) {
            const clone = this.state.selectedCategories.slice();
            const index = this.state.selectedCategories.indexOf(e.target.name);
            clone.splice(index, 1);
            this.setState({
                selectedCategories: clone
            });
        } else {
            this.setState({
                selectedCategories: this.state.selectedCategories.concat([e.target.name])
            });
        }
    }

    

    getVisibleItems = () => {
        return this.state.items.filter(item => this.isSelected(item.category));
    };

    isSelected = (name) => {
        //console.log(name);
        return this.state.selectedCategories.indexOf(name) >= 0;
    }

  render(){
    return(
      <>
            <Header />
            {
                this.state.allCategories.map(categoryName => {
                    return (
                        <Checkbox
                            key={categoryName}
                            name={categoryName}
                            onChange={this.handleDropdown}
                            checked={this.isSelected(categoryName)}
                        />
                    );
                })
            }
            <ItemList items={this.getVisibleItems()} />
      </>

    );
  }
}

export default HomePage;
