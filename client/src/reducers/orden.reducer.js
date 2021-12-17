import{ ADD_TO_CART,
        REMOVE_ALL_FROM_CART,
        REMOVE_ONE_FROM_CART,
        CLEAR_CART
    
} from '../actions/actionsTypes'


const initialState ={
    products: [
        {id:1, name:tv, price: 100},
        {id:2, name:celu, price: 200},
        {id:3, name:compu, price: 300},
        {id:4, name:teclados, price: 400},
        {id:5, name:impresoras, price: 500}
    ],

    cart:[]
}

    export function cartStorage(item, action){    //Storage es objeto
        let itemCart =JSON.parse(window.localStorage.getItem("cart")) // se codifica pq solo maneja cadena
        
        if(itemCart === null) return itemCart = {};

        if(action === 'Add To Cart'){
            itemCart[item.id].count += 1
        }
            itemCart[item.id] = {...item, id: item.id, count:1}
        if(action === 'Substarct Item'){
            itemCart[item.id].count -1 === 0 ? delete itemCart[item] : itemCart[item.id].count -= 1
        }
        if(action === 'Delete Item'){
            delete itemCart[item]
        }
        if(action === 'Clear Cart'){
            itemCart={}
        }
        window.localStorage.setItem("cart", JSON.stringify(itemCart))
        return itemCart
    };


export function ordenReducer(state = initialState, action){
    switch(action.type){
        case ADD_TO_CART:
            const addCart = cartStorage(action.payload, 'Add To Cart')
            return {
                ...state,
                cart: addCart
            }

        case REMOVE_ALL_FROM_CART:
            const removeAllCart = cartStorage(action.payload, 'Delete Item') 
            return {
                ...state,
                cart: removeAllCart
            }  
        
        case REMOVE_ONE_FROM_CART:
            const removeOneCart = cartStorage(action.payload, 'Substarct Item') 
            return {
                ...state,
                cart: removeOneCart
            }
            
        case CLEAR_CART:
            const cleCart = cartStorage(action.payload, 'Clear Cart') 
            return {
                ...state,
                cart: cleCart
            }
            
        default:
            return state    
    }
}