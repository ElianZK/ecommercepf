
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
        
} from '../actions/actionsTypes'



const initialState ={
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    
   
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
                		if (item.idproduct === action.payload.idproduct) {
                			return {...item.qty = item.qty - 1};
                		} else {
                			return item;
                		}
                	})
                    return {
                        ...state,
                        cart: state.cart.filter(item =>item.qty > 0)
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

        case CART_FROM_LOCALSTORAGE_TO_DB:
        return {
            ...state,
            cart: action.payload.cart,
            orderId: action.payload.orderId
        }

        case UPDATE: {
        	if (state.cart) {
        		return {
        			...state,
        			cart: [...state.cart]
        		};
        	}
        }
        
        case CART_FROM_DB_TO_LOCALSTORAGE:
        return {
            ...state,
            cart: [...action.payload.products],
            orderId: action.payload.orderId
        }
            default:
                return state    
            }
}
        // case ADD_TO_CART:
        //     let addItem = true;

        // 	state.cart &&
        // 		state.cart.map(item => {
        // 			if (item.idproduct === action.payload.idproduct ) {
        // 				addItem = false;
        // 				return (item.qty = item.qty + 1 || 1);
        // 			}
        // 		});

        // 	addItem === true &&
        // 		state.cart.push({
        // 			id: action.payload.id,
        // 			stock: action.payload.stock,
        // 			image: action.payload.thumbnail,
        // 			name: action.payload.name,
        // 			qty: action.payload.qty,
        // 			price: action.payload.price,
                    
        // 			//	subtotal: action.payload.price * action.payload.cuantity,
        // 		});

        // 	return {
        // 		...state,
        // 	};
                
        // case REMOVE_FROM_CART:
        //     state.cart.map(item => {
        // 		if (item.idproduct === action.payload.idproduct) {
        // 			return {...item.qty = item.qty - 1};
        // 		} else {
        // 			return item;
        // 		}
        // 	}); 
        //     return {
        //         ...state,
        //         cart: state.cart.filter(item =>item.qty > 0)
        //     }

        // case CHANGE_QTY:
        //     return{
        //         ...state,
        //         cart: action.payload
        //     }  
            
        // case OPEN_MODAL:
        // return {
        //     ...state,
        //     modal: action.payload,
        // };


            
        // case CLEAR_CART:
        //     return {
        //         ...state,
        //         cart: []
        //      }
            