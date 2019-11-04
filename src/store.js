import { createStore } from "redux";
import ItemPage from "./pages/ItemPage.jsx";
import { connect } from "react-redux";

const USER_LOADED = "USER_LOADED";
const initialState = {
  email: null,
  _id: null,
};

const ITEM_ADDED = "ITEM_ADDED";

export const addItem = (item) => ({
  type: ITEM_ADDED,
  payload: item,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_ADDED: {
      return {
        ...state,
        cart: state.cart.concat([action.payload])
      };
    }
    default:{
      return state;
    }
  }
};

const store = createStore(authReducer);
store.subscribe( () => console.log("store: ", store.getState()));

store.dispatch({
  type: USER_LOADED,
  payload:{
    email: "devtest1@gmail.com",
    _id: 1,
  }
});

export default connect(authReducer)(ItemPage);