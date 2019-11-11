import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

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
  items: []
};

const ITEMS_SUCCESS = "ITEMS_SUCCESS";
const ITEMS_FAILURE = "ITEMS_FAILURE";
const ITEMS_REQUEST = "ITEMS_REQUEST";

const ITEM_ADDED = "ITEM_ADDED";
const ITEM_REMOVED = "ITEM_REMOVED";

export const getItems = () => (dispatch, getState) =>{

  if(getState().items.length > 0) return null;

  dispatch(itemsRequest());
  return fetch("/api/v1/items")
        .then(res => {
        return res.json();
    })
    .then(items =>{
      dispatch(itemsSuccess(items));
    })
    .catch(err=>{
      console.log(err);
      dispatch(itemsFailure());
    });
};  

export const itemsSuccess = (items) => ({
  type: ITEMS_SUCCESS,
  payload: items
});

export const itemsFailure = () => ({
  type: ITEMS_FAILURE,
});

export const itemsRequest = () => ({
  type: ITEMS_REQUEST,
});

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
    case ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.payload
      };
    }
    default:{
      return state;
    }
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe( () => console.log("store: ", store.getState()));

const removeItemById = (items, _id) =>{
  const index = items.findIndex(item => item._id === _id);
  if(index === -1) return items;
  const copy = items.slice();
  copy.splice(index, 1);
  return copy;
};


export default store;