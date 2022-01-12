import {
    ADD_TO_CART,
    ADD_TO_CART_FROM_DB,
    DELETE_ITEM_FROM_CART,
    DELETE_ITEM_FROM_CART_LOCALSTORAGE,
    CART_FROM_LOCALSTORAGE_TO_DB,
    CART_FROM_DB_TO_LOCALSTORAGE,
    GET_PRODUCTS_CART,
    CHANGE_QTY,
    CLEAR_CART,
    GET_ALL_ORDERS,
    UPDATE,
    SET_ORDER_PRODUCTS,
    ADMIN_FILTER_ORDERS_BY_STATE,
    ADMIN_FILTER_ORDERS_BY_PRICE,

} from '../actions/actionsTypes'



const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    orders: [],
    orderId: []
}


export function ordenReducer(state = initialState, action) {
    switch (action.type) {
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

        case DELETE_ITEM_FROM_CART_LOCALSTORAGE:
            state.cart.map(item => {
                if (item.idproduct === action.payload.idProduct) {
                    return {
                        ...item.amuont = item.amount - 1
                    };
                } else {
                    return item;
                }
            })
            return {
                ...state,
                cart: state.cart.filter(item => item.amount > 0)
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
            console.log(state.cart)
            return {
                ...state,
                cart: [...state.cart]
            };


        case SET_ORDER_PRODUCTS:
            return {
                ...state,
                orderId: action.payload.orderId,
                    orders: action.payload.orders
            }

        case ADMIN_FILTER_ORDERS_BY_STATE:
                let sort;
                if (action.payload === '') sort = state.orders;

                if(action.payload === 'created') sort = state.orders.sort(o=>
                    o.status === 'created'
                )

                if(action.payload === 'completed') sort = state.orders.sort(o=>
                    o.status === 'completed'
                )

                if(action.payload === 'rejected') sort = state.orders.sort(o=>
                    o.status === 'rejected'
                )
                return{
                    ...state,
                    orders:sort
                }
        case ADMIN_FILTER_ORDERS_BY_PRICE:
            let sortPrice;
            if(action.payload === 'All') sortPrice = state.orders;
            if(action.payload === 'H-price') sortPrice = state.orders.map((a,b)=>b.totalPrice - a.totalPrice);
            if(action.payload === 'L-price') sortPrice = state.orders.map((a,b)=>a.totalPrice - b.totalPrice);
            return {
                ...state,
                orders:sortPrice
            }

            case GET_ALL_ORDERS:
                return {
                    ...state,
                    orders: action.payload
                }

                default:
                    return state
    }
}