import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web


const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {store, persistor};
};

