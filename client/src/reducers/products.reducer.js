import{ GET_ALL_PRODUCTS, 
        GET_PRODUCT_BY_NAME,
        GET_PRODUCT_DETAIL,
        GET_ALL_CATEGORIES,
        FILTER_PRODUCTS_BY_CATEGORY,
        FILTER_PRODUCTS_BY_PRICE,
        FILTER_PRODUCTS_BY_BRANDS,
        SORT_PRODUCTS
    } from '../actions/actionsTypes'

const initialState = {
    allProducts: [], 
    productDetail: [],
    filters: [],
    categories: []
}

export function productsReducer(state = initialState, action){   
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                filters: action.payload
            };
        case GET_PRODUCT_BY_NAME:
            return {
                ...state,
                filters: action.payload
            };
        case GET_PRODUCT_DETAIL:
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
        case FILTER_PRODUCTS_BY_CATEGORY:
            const filteredCategory = action.payload === 'All'
            ? state.allProducts
            : state.allProducts.filter((p) => p.categories && p.categories.filter((c)=>
            c.name === action.payload).length)
            return {
                ...state,
                filters: filteredCategory
            };
        case FILTER_PRODUCTS_BY_PRICE:  //ver como viene de ruta
            const filteredPrice = action.payload === 'All'
            ? state.allProducts
            : state.allProducts.filter((p) => p.price >= action.payload.min && p.price <= action.payload)
            return {
                ...state,
                filters: filteredPrice
            }
            case FILTER_PRODUCTS_BY_BRANDS: 
            const filteredBrands= action.payload === 'All'
            ? state.allProducts
            : state.allProducts.filter((p) => p.brands === action.payload)
            return {
                ...state,
                filters: filteredBrands
            };
            case SORT_PRODUCTS:
                let sorts;
                 if(action.payload === 'All') sorts=  state.allProducts;
                 if(action.payload === 'AZ'){  //alpha
                      sorts = state.filters.sort((a,b) => {
                         if(a.name > b.name) return 1;
                         if(a.name < b.name) return -1;
                         return 0;
                     })
                 }
                 if(action.payload === 'ZA'){
                    sorts = state.filters.sort((a,b) => {
                         if(a.name < b.name) return 1;
                         if(a.name > b.name) return -1;
                         return 0;
                     })
                 }
                 if(action.payload === 'Lower price'){  //num
                      sorts = state.filters.sort((a,b) => {
                         return   a.price - b.price;
                     })      
                 }
                 if(action.payload === 'Highest price'){
                     sorts = state.filters.sort((a,b) => {
                       return  b.price - a.price;
                     })      
                 }
            return {
                ...state,
                filters: sorts
            };
     

        default:
            return state;
    }
}

