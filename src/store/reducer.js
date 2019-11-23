import PropTypes from "prop-types";
import {ITEM_ADDED, ITEM_REMOVED, ITEMS_SUCCESS, TOKEN_UPDATE, USER_UPDATE} from "./actions";

export const userProptypes = {
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};


const initialState = {
    token: null,
    user: null,
    cart: [
        //item
    ],
    items: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_UPDATE:
            return {
                ...state,
                token: action.payload,
            };
        case USER_UPDATE:
            return {
                ...state,
                user: action.payload,
            };
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
        default: {
            return state;
        }
    }
};

const removeItemById = (items, _id) => {
    const index = items.findIndex(item => item._id === _id);
    if (index === -1) return items;
    const copy = items.slice();
    copy.splice(index, 1);
    return copy;
};