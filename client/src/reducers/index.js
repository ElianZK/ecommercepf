import { combineReducers } from 'redux';
import {productsReducer} from './products.reducer'
<<<<<<< Updated upstream
=======
import {cartReducer} from './cart.reducer'
import {usersReducer} from './users.reducer'
>>>>>>> Stashed changes




export default combineReducers({
   productsReducer,
<<<<<<< Updated upstream
=======
   cart: cartReducer,
   usersReducer,
>>>>>>> Stashed changes
});