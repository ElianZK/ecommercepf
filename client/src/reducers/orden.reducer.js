
import{ ADD_TO_CART,
        REMOVE_FROM_CART,
        CHANGE_QTY,
        OPEN_MODAL,
        UPDATE,
        CLEAR_CART  
} from '../actions/actionsTypes'



const initialState ={
    cart:[],

}


export function ordenReducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
            let addItem = true;

			state.cart &&
				state.cart.map(item => {
					if (item.idproduct === action.payload.idproduct ) {
						addItem = false;
						return (item.qty = item.qty + 1 || 1);
					}
				});

			addItem === true &&
				state.cart.push({
					id: action.payload.id,
					stock: action.payload.stock,
					image: action.payload.thumbnail,
					name: action.payload.name,
					qty: action.payload.qty,
					price: action.payload.price,
					
					//	subtotal: action.payload.price * action.payload.cuantity,
				});

			return {
				...state,
			};
                
        case REMOVE_FROM_CART:
            state.cart.map(item => {
				if (item.idproduct === action.payload.idproduct) {
					return {...item.qty = item.qty - 1};
				} else {
					return item;
				}
			}); 
            return {
                ...state,
                cart: state.cart.filter(item =>item.qty > 0)
            }

        case CHANGE_QTY:
            return{
                ...state,
                cart: action.payload
            }  
            
        case OPEN_MODAL:
        return {
            ...state,
            modal: action.payload,
        };

        case UPDATE: {
			if (state.cart) {
				return {
					...state,
					cart: [...state.cart]
				};
			}
		}

            
        case CLEAR_CART:
            return {
                ...state,
                cart: []
             }
            
        default:
            return state    
    }
}