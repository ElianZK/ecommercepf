import { combineReducers } from 'redux';
import {productsReducer} from './products.reducer'
import {ordenReducer} from './orden.reducer'

export default combineReducers({
   productsReducer,
   ordenReducer,
});