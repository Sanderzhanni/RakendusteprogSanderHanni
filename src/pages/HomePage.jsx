import React from "react";
import ItemList from "../components/ItemList.jsx";
import "../components/checkbox.css";
//import {digitalPianos, bassGuitars} from "./mydatabase.js";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";

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
        fetch("/api/v1/items")
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

    handleSelectedFilter = (e) => {
        const category_name = e.target.name;

        if (this.isSelected(category_name)) {
            return this.unselect_category(category_name);
        } 

        this.select_category(category_name); 
    }

    select_category = (category_name) =>{
        this.setState({
            selectedCategories: this.state.selectedCategories.concat([category_name])
        });
    };

    unselect_category = (category_name) =>{

        const sorted_array = this.state.selectedCategories.filter(cn => cn !== category_name);

        this.setState({
            selectedCategories: sorted_array
        });

    };

    

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
            <div className="checkbox__Container">
            {
                this.state.allCategories.map(categoryName => {
                    return (
                        <Checkbox
                            key={categoryName}
                            name={categoryName}
                            onChange={this.handleSelectedFilter}
                            checked={this.isSelected(categoryName)}
                            />
                    );
                })
                }
            </div>

            
            <div className="foundItems">
                <p>
                Items found: {items.length}
                 <br></br> 
                 Kategooriad: {this.state.selectedCategories.join(", ")}
                </p>
            </div>
            <div className={"items-settings"}>
                <SortDropdown
                    direction={this.state.sortDirection}
                    onChange={this.handleSortDropdown}
                />
            </div>
            <ItemList items={this.getVisibleItems()} />
      </>

    );
  }
}

export default HomePage;
