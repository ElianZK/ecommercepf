import { combineReducers } from 'redux';
import {productsReducer} from './products.reducer'
<<<<<<< HEAD
import {cartReducer} from './cart.reducer'
import {usersReducer} from './users.reducer'




export default combineReducers({
   productsReducer,
   cartReducer,
   usersReducer,
=======
import {ordenReducer} from './orden.reducer'
import {usersReducer} from './users.reducer'
import  reviewReducer  from './review.reducer'

export default combineReducers({
   productsReducer,
   ordenReducer,
   usersReducer,
   reviewReducer
>>>>>>> origin/develop-fran
});