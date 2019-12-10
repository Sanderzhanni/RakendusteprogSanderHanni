import * as services from "../services";
import * as selectors from "./selectors";
import {toast} from "react-toastify";

//const USER_SUCCESS = "USER_SUCCESS";
//const USER_FAILURE = "USER_FAILURE";
//const USER_REQUEST = "USER_REQUEST";

export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_FAILURE = "ITEMS_FAILURE";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_ADDED_LIKED = "ITEM_ADDED_LIKED";
export const ITEM_REMOVED = "ITEM_REMOVED";
export const ITEM_REMOVED_LIKED = "ITEM_REMOVED_LIKED";
export const USER_UPDATE = "USER_UPDATE";
export const TOKEN_UPDATE = "TOKEN_UPDATE";


export const refreshUser = () => (dispatch, getState) =>{
    const store = getState();
    const userId = selectors.getUser(store)._id;
    const token = selectors.getToken(store);
    services.getUser({userId, token})
        .then( user => {
            dispatch(userUpdate(user));
        })
        .catch(err => {
            console.log("error", err);
        });
};

export const getItems = () => (dispatch) => {
    //const store = getState();
    //if (selectors.getItems(store).length > 0) return null;
    dispatch(itemsRequest());
    return services.getItems()
        .then(items => {
            dispatch(itemsSuccess(items));
        })
        .catch(err => {
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

export const addItem = (item) => (dispatch, getState) => {
    const store = getState();
    const userId = selectors.getUser(store)._id;
    const itemId = item._id;
    const token = selectors.getToken(store);
    const cart = selectors.getCart(store);
    if(cart.includes(itemId)){
        return  toast.warning("toode on juba korvis olemas", {hideProgressBar: true, position: "bottom-right"});
    }
    services.addItemToCart({userId, itemId, token})
    .then(() => {
        toast.success("toode lisatud", {hideProgressBar: true, position: "bottom-right"});
        dispatch({
           type: ITEM_ADDED,
            payload: itemId
        });
    })
    .catch(err => {
        console.log(err);
        toast.error("Toode lisamisel tekkis viga!");
    });
};

export const addItemToLiked = (item) => (dispatch, getState) => {
    const store = getState();
    const userId = selectors.getUser(store)._id;
    const itemId = item._id;
    const token = selectors.getToken(store);
    services.addItemToLiked({userId, itemId, token})
        .then(() => {
            toast.success("toode lisatud lemmikutesse", {hideProgressBar: true, position: "bottom-right"});
            dispatch({
                type: ITEM_ADDED_LIKED,
                payload: itemId
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Toode lisamisel tekkis viga!");
        });
};

export const removeItem = (itemId) => (dispatch, getState) =>{
    const store = getState();
    const userId = selectors.getUser(store)._id;
    const token = selectors.getToken(store);
    services.removeItemFromCart({userId, itemId, token})
        .then(() => {
            toast.success("toode eemaldatud", {hideProgressBar: true, position: "bottom-right"});
            dispatch({
                type: ITEM_REMOVED,
                payload: itemId
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Toode eemaldamisel tekkis viga!");
        });
};

export const removeItemLiked = (itemId) => (dispatch, getState) =>{
    const store = getState();
    const userId = selectors.getUser(store)._id;
    const token = selectors.getToken(store);
    services.removeItemFromLiked({userId, itemId, token})
        .then(() => {
            toast.success("toode eemaldatud lemmikutest", {hideProgressBar: true, position: "bottom-right"});
            dispatch({
                type: ITEM_REMOVED_LIKED,
                payload: itemId
            });
        })
        .catch(err => {
            console.log(err);
            toast.error("Toode eemaldamisel tekkis viga!");
        });
};

export const userUpdate = (user) => ({
    type: USER_UPDATE,
    payload: user,
});

export const tokenUpdate = (token) => ({
    type: TOKEN_UPDATE,
    payload: token,
});