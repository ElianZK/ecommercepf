import{ ADD_TO_CART,
        REMOVE_FROM_CART,
        CHANGE_QTY,
        CLEAR_CART  
} from '../actions/actionsTypes'


const initialState ={
    cart:[],
}


export function ordenReducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
            let addItem = true;

			state.cart && state.cart.map(item => {
                if (item.id === action.payload.id) {
                    addItem = false;
                    return (item.qty = item.qty + 1 || 1);
					}
				});

			addItem === true && state.cart.push({
					id: action.payload.id,
					stock: action.payload.stock,
					image: action.payload.image,
					name: action.payload.name,
					qty: action.payload.qty,
					price: action.payload.price,
					brand: action.payload.brand,
					amount: action.payload.price * action.payload.qty,
				});

			return {
				...state,
                cart: addItem
			};

        
        case REMOVE_FROM_CART:
            state.cart.map(item => {
				if (item.id === action.payload.id) {
					return (item.qty = item.qty - 1);
				} else {
					return (item.qty = item.qty);
				}
			}); 
            return {
                ...state,
                cart: state.cart.filter(item =>item.id !== action.payload)
            }

        case CHANGE_QTY:
            return{
                ...state,
                cart: action.payload
            }    
            
        case CLEAR_CART:
            //const cleCart = cartStorage(action.payload, 'Clear Cart') 
            return {
                ...state,
                cart: []
             }
            
        default:
            return state    
    }
}