
import{ ADD_TO_CART,
        ADD_TO_CART_FROM_DB,
        DELETE_ITEM_FROM_CART,
        DELETE_ITEM_FROM_CART_LOCALSTORAGE,
        CART_FROM_LOCALSTORAGE_TO_DB,
        CART_FROM_DB_TO_LOCALSTORAGE,
        GET_PRODUCTS_CART,
        CHANGE_QTY,
        CLEAR_CART,
      
        UPDATE,
        SET_ORDER_PRODUCTS,
        
} from '../actions/actionsTypes'



const initialState ={
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    orders: [],
    
}


export function ordenReducer(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS_CART:
      return {
        ...state,
        cart: action.payload,
      };
        case ADD_TO_CART:
        return {
            ...state,
            cart: action.payload,
        };

        case ADD_TO_CART_FROM_DB:
        return {
            ...state,
            cart: action.payload,
        };

        case DELETE_ITEM_FROM_CART:
        return {
            ...state,
            cart: state.cart.filter(el => el.id !== action.payload),
        };

        case  DELETE_ITEM_FROM_CART_LOCALSTORAGE:
            state.cart.map(item => {
                if (item.idproduct === action.payload.idProduct) {
                    return {...item.amuont = item.amount - 1};
                } else {
                    return item;
                }
                })
                    return {
                        ...state,
                        cart: state.cart.filter(item =>item.amount > 0)
        };
    

        case CLEAR_CART:
            
        return {
            ...state,
            cart: [],
        };

        case CHANGE_QTY:
            return {
            ...state,
            cart: action.payload,
        };


        case UPDATE: 
            return {
            ...state,
            cart: action.payload
        };

        	
        case SET_ORDER_PRODUCTS:
            return {
            ...state,
            orders: action.payload.orders
        }

        default:
            return state    
            }
}
       