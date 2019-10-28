import React from "react";
import { createStore } from "redux";
import ItemList from "../components/ItemList.jsx";


const counter = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };

  const store = createStore(counter);



store.dispatch({ type: "INCREMENT" });

class Store extends React.PureComponent{

    state = { checked: false }

    constructor(props){
      super(props);
        this.state = {
          items: [],
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
  
  
      
  
      getVisibleItems = () => {
          return(
            this.state.items
          ); 
      };
  
      isSelected = (name) => {
          //console.log(name);
          return this.state.selectedCategories.indexOf(name) >= 0;
      }
  
      render() {
      return(
        <>
              <ItemList items={this.getVisibleItems()} />
        </>
  
      );
    }

}

export default Store;