import{ 
    ADD_TO_CART, 
    ADD_TO_CART_FROM_DB, 
    CHANGE_QUANTITY, 
    CLEAR_CART, 
    GET_PRODUCTS_CART, 
    REMOVE_ITEM_FROM_CART, 
    REMOVE_ITEM_FROM_CART_LOCALSTORAGE,
    GO_TO_CHECKOUT
    
} from '../actions/actionsTypes'

const initialState ={
    cart: JSON.parse(localStorage.getItem("cart") || []),
}


export function cartReducer(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS_CART:
            return{
                ...state,
                cart: action.payload
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            };

        case ADD_TO_CART_FROM_DB:
            return {
                ...state,
                cart: action.payload
            };

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((p) => p.id !== action.payload),
            };

        case REMOVE_ITEM_FROM_CART_LOCALSTORAGE:
            return {
                ...state,
                cart: [...state.cart.map(p => {
                    if(p.id === action.payload){
                        p.quantity = 0;
                        return p;
                    }return p
                })]
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: []
            };

        case CHANGE_QUANTITY:
            return {
                ...state,
                cart: action.payload
            }
            
        default:
            return state;  
    }
}