import React from "react";
import Header from "./header.jsx";
import ItemList from "./ItemList.jsx";
import "./checkbox.css";
//import {digitalPianos, bassGuitars} from "./mydatabase.js";
import Checkbox from "./Checkbox.jsx";
import SortDropdown from "./SortDropdown.jsx";

class HomePage extends React.PureComponent{

    state = { checked: false }

  
  constructor(props){
    super(props);
      this.state = {
        sortDirection: -1,
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
        return this.state.items
            .filter(item => this.isSelected(item.category))
            .sort((a, b) => {
                switch (this.state.sortDirection) {
                    case -1: return b.price - a.price;
                    case 1: return a.price - b.price;
                }
            });
            
    };

    isSelected = (name) => {
        //console.log(name);
        return this.state.selectedCategories.indexOf(name) >= 0;
    }

    handleSortDropdown = (e) => {
        console.log(e.target.value);
        this.setState({
            sortDirection: parseInt(e.target.value),
        });
    };



    render() {
        const items = this.getVisibleItems();
    return(
      <>
            <Header />
            <div className="checkbox__Container">
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
            </div>

            <div className={"items-settings"}>
                <SortDropdown
                    direction={this.state.sortDirection}
                    onChange={this.handleSortDropdown}
                />
            </div>
            <div>
                items found: {items.length} kategooriatest: {this.state.selectedCategories.join(", ")}
            </div>
            <ItemList items={this.getVisibleItems()} />
      </>

    );
  }
}

export default HomePage;
