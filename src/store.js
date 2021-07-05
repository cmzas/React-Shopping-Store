import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducers } from "./reducers/productReducers";

const initialState={};
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store=createStore(combineReducers({
    products:productReducers
}),
initialState,
composeEnhancers(applyMiddleware(thunk))
);
export default store;