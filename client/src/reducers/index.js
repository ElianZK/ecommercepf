import { combineReducers } from 'redux';
import {productsReducer} from './products.reducer'
import {cartReducer} from './cart.reducer'
import {usersReducer} from './users.reducer'




export default combineReducers({
   productsReducer,
   cartReducer,
   usersReducer,
});