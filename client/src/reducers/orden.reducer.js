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
  UPDATE,
  SET_ORDER_PRODUCTS,
  BUY_PRODUCT,
  ADMIN_FILTER_ORDERS_BY_STATE,
  ADMIN_FILTER_ORDERS_BY_PRICE,
  GET_ALL_ORDERS,
  UPDATE_ORDERS
  
} from "../actions/actionsTypes";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  orders: [],
  product: null
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
        cart: state.cart.filter((el) => el.id !== action.payload),
      };

    case DELETE_ITEM_FROM_CART_LOCALSTORAGE:
      state.cart.map((item) => {
        if (item.idproduct === action.payload.idProduct) {
          return { ...(item.amuont = item.amount - 1) };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: state.cart.filter((item) => item.amount > 0),
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
                //Shipping status
                  if(action.payload === '') sort = state.orders;
                  if(action.payload === 'processing') sort = state.orders.filter(o=>o.dispatched==='processing' )
                  if(action.payload === 'sent') sort = state.orders.filter(o=>o.dispatched==='sent')
                  if(action.payload === 'recieved') sort = state.orders.filter(o=>o.dispatched === 'recieved')
                //Order Status
                  if(action.payload === 'processing') sort = state.orders.filter(o=>o.status==='processing')
                  if(action.payload === 'rejected') sort = state.orders.filter(o=>o.status==='rejected')
                  if(action.payload === 'canceled') sort = state.orders.filter(o=>o.status === 'canceled' ) 
                  if(action.payload === 'completed') sort = state.orders.filter(o=>o.status === 'completed')
                  //!console.log("A VER: ",sort , "MODO: ", action.payload.payload, action.payload)
                return{
                  ...state,
                  orderadici:[...sort]
                };

        case ADMIN_FILTER_ORDERS_BY_PRICE:
            let sortPrice;
            if(action.payload === '') sortPrice = state.orders;
            if(action.payload === 'H-price') sortPrice = state.orderadici.sort((a,b)=>b.totalPrice - a.totalPrice)
            if(action.payload === 'L-price') sortPrice = state.orderadici.sort((a,b)=>a.totalPrice - b.totalPrice)
            console.log(sortPrice)
            return {
                ...state,
                orderadici:[...sortPrice]
            }

            case GET_ALL_ORDERS:
                return {
                    ...state,
                    orders: [...action.payload],
                    orderadici:[...action.payload],
                }
            case UPDATE_ORDERS:
              return {
                ...state,
                orderadici: [...state.orderadici.map(el=>{
                  if(el.idOrder===action.payload.id){
                    return {...el, dispatched:action.payload.status}
                  }
                  return el
                })]
              }

        case BUY_PRODUCT:
            console.log(action.payload);

            return {
                ...state,
                product: action.payload
            };

        default:
            return state
    }
}
