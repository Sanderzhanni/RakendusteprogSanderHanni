import { createStore } from "redux";

//const USER_SUCCESS = "USER_SUCCESS";
//const USER_FAILURE = "USER_FAILURE";
//const USER_REQUEST = "USER_REQUEST";

const initialState = {
  user:{
    email: null,
  _id: null,
  token: null,
  },
  cart:[
    //item
  ],
};

const ITEM_ADDED = "ITEM_ADDED";
const ITEM_REMOVED = "ITEM_REMOVED";

export const addItem = (item) => ({
  type: ITEM_ADDED,
  payload: item,
});

export const removeItem = (_id) => ({
  type: ITEM_REMOVED,
  payload: _id,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_ADDED: {
      return {
        ...state,
        cart: state.cart.concat([action.payload])
      };
    }
    case ITEM_REMOVED: {
      return {
        ...state,
        cart: removeItemById(state.cart, action.payload),
      };
    }
    default:{
      return state;
    }
  }
};

const store = createStore(reducer);
store.subscribe( () => console.log("store: ", store.getState()));

const removeItemById = (items, _id) =>{
  const index = items.findIndex(item => item._id === _id);
  if(index === -1) return items;
  const copy = items.slice();
  copy.splice(index, 1);
  return copy;
};


export default store;