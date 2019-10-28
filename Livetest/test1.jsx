import React from "react";

const ITEMS = [
  {
    name: "Product 1",
    cost: 200,
  },
  {
    name: "Product 2",
    cost: 100,
  },
  {
    name: "Product 3",
    cost: 20,
  }
];

class LiveTest1 extends React.PureComponent {
  state = {
    rows: ITEMS
  };
  render(){
    return(
      <>
        <div>Products below:</div>
        <div>{this.state.rows}</div>
        <hr/>

        <div>{this.handleSum()}</div> 
      </>
    );
  }
}

handleSum = () =>{
    //mingi fuktsioon
};

export default LiveTest1;

/*
const userSchema = new mongoose.Schema({
  email: {type: String, required:true, unique: true },
  hash: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  cart: {type: Array, default: required:true },
});

*/ 