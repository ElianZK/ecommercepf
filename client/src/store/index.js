import {createStore, applyMiddleware, compose} from "redux";
<<<<<<< HEAD
import {reducer} from "../reducer"
=======
import reducer from '../reducer/index'
>>>>>>> origin/develop-fran
import thunk from "redux-thunk"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
// const store = createStore(reducer);

export default store;