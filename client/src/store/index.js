import {createStore, applyMiddleware, compose} from "redux";
import combineReducers from '../reducers/index'
import thunk from "redux-thunk"


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers, 
    composeEnhancer(applyMiddleware(thunk)));
// const store = createStore(reducer);

export default store;