import{ ADD_TO_CART,
        REMOVE_ALL_FROM_CART,
        REMOVE_ONE_FROM_CART,
        CLEAR_CART
    
} from '../actions/actionsTypes'


const initialState ={
    cart: []
}

    export function cartStorage(item, action){    //Storage es objeto
        let itemCart =JSON.parse(windows.localStorage.getItem("cart")) // se codifica pq solo maneja cadena
        
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
        windows.localStorage.setItem("cart", JSON.stringify(itemCart))
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
    }
}