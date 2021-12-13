import{ GET_ALL_PRODUCTS, 
        GET_PRODUCT_BY_NAME,
        GET_PRODUCT_ID,
        GET_ALL_CATEGORIES,
        FILTER_PRODUCTS_BY_CATEGORY,
        //FILTER_PRODUCTS_BY_PRICE,
        FILTER_PRODUCTS_BY_BRANDS,
        SORT_PRODUCTS,
        CREATE_CATEGORY,
        CREATE_PRODUCT,
        FILTERS_CLEAR,
        LOGIN,
        LOGOUT
    } from '../actions/actionsTypes'

const initialState = {
    allProducts: [], 
    productDetail: [],
    categories: [], 
    loginInfo:{
        isConnected: false,
        user: {
            name: "",
            email: ""
        }
    }
}

export function productsReducer(state = initialState, action){   
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            };

        case GET_PRODUCT_BY_NAME:
            return {
                ...state,
                allProducts: action.payload
            };

        case GET_PRODUCT_ID:
            return {
                ...state,
                allProducts: action.payload,
                productDetail: action.payload
            };   

        case  GET_ALL_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };

        case CREATE_CATEGORY:
            return {
                ...state
            }

        case CREATE_PRODUCT:
            return {
                ...state
            }

        case FILTER_PRODUCTS_BY_CATEGORY:
            const filteredCategory = action.payload === 'All'
            ? state.allProducts
            : state.allProducts.filter((p) => p.category && p.category.filter((c)=>
            c.name === action.payload).length)
            return {
                ...state,
                allProducts: filteredCategory
            };

        // case FILTER_PRODUCTS_BY_PRICE:    //ver como viene de ruta
        //     const filteredPrice = !action.payload ? state.allProducts
        //     : state.allProducts.filter((p) => p.price >= action.payload.min && p.price <= action.payload.max)
        //     return {
        //         ...state,
        //         allProducts: filteredPrice
        //     }

        case FILTER_PRODUCTS_BY_BRANDS: 
            const filteredBrands= action.payload === 'All'
            ? state.allProducts
            : state.allProducts.filter((p) => p.brands === action.payload)
            return {
                ...state,
                allProducts: filteredBrands
            };

        case SORT_PRODUCTS:
            let sorts;
            if(action.payload === 'All') sorts= state.allProducts
            if(action.payload === 'A-Z'){  //alpha
                console.log('reducer',state)
                sorts = state.allProducts.productsInfo.sort((a,b) => {
                    if(a.name.trim() > b.name.trim()) return 1;
                    if(a.name.trim() < b.name.trim()) return -1;
                    return 0;
                })
            }
            if(action.payload === 'Z-A'){
                sorts = state.allProducts.productsInfo.sort((a,b) => {
                    if(a.name.trim() < b.name.trim()) return 1;
                    if(a.name.trim() > b.name.trim()) return -1;
                    return 0;
                })
            }
             if(action.payload === 'Lower_price'){  //num
                sorts = state.allProducts.productsInfo.sort((a,b) => {
                    return   a.price - b.price;
                })      
            }
            if(action.payload === 'Highest_price'){
                sorts = state.allProducts.productsInfo.sort((a,b) => {
                    return  b.price - a.price;
                })      
            }
        return {
            ...state,
            allProducts: {...state.allProducts,productsInfo: sorts}
            

        };

        case LOGIN:
            return{
                ...state,
                loginInfo: action.payload
            }
        
        case LOGOUT:
            return{
                ...state,
                loginInfo: action.payload
            }

        case FILTERS_CLEAR:
            return {
                ...state,
                allProducts: state.allProducts
            } 

        default:
            return state;
    }
}

