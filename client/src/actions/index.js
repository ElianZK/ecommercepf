import { GET_ALL_PRODUCTS, 
    GET_PRODUCT_BY_NAME,
    GET_PRODUCT_ID,
    GET_ALL_CATEGORIES,
    GET_ALL_BRANDS,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_PRICE,
    FILTER_PRODUCTS_BY_BRANDS,
    SORT_PRODUCTS,
    CREATE_CATEGORY,
    CREATE_PRODUCT,
    CREATE_BRANDS,
    FILTERS_CLEAR,
    REMOVE_CATEGORY,
    REMOVE_BRANDS,
    REMOVE_PRODUCT,
    EDIT_CATEGORY,
    EDIT_PRODUCT,
    EDIT_BRANDS,
    LOGIN,
    LOGOUT,
    ADD_TO_CART,
    REMOVE_ALL_FROM_CART,
    REMOVE_ONE_FROM_CART,
    CLEAR_CART,
    CREATE_USER
} from "./actionsTypes";
import axios from 'axios';
import Swal from 'sweetalert2';

const SERVER = 'http://localhost:3001';


    export function getAllProducts(data) {
        let {offset=0, limit=25, minPrice= null,  maxPrice= null,brand = null, category=null} = data
        minPrice= minPrice?`&minPrice=${minPrice}`: '';
        maxPrice=maxPrice?`&maxPrice=${maxPrice}`:'';
        brand=brand? `&brand=${brand}`:'';
        category=category? `&category=${category}`:'';
        return async function(dispatch){
            try{
                console.log(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}`)
                const products = await axios.get(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}`);
                return dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: products.data
                });
            }catch(err){
                return dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: []
            })}
        }
    };

    export function getProductId(idProduct) {
        return async function(dispatch){
            try{
                const detail= await axios.get(`${SERVER}/products/${idProduct}`)
                return dispatch({
                    type: GET_PRODUCT_ID,
                    payload: detail.data
                })     
            }catch(err){
                console.log(err)
            }   
        }
    };

    export function getCategories(){
        return async function(dispatch){
            try{
                const categories= await axios.get(`${SERVER}/categories`)
                return dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: categories.data
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function getBrands(){
        return async function(dispatch){
            try{
                const brands= await axios.get(`${SERVER}/brands`)
                return dispatch({
                    type: GET_ALL_BRANDS,
                    payload: brands.data
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function createCategory(payload){
        return async function (dispatch){
            const newCategory = await axios.post(`${SERVER}/categories`, payload)
            return dispatch ({
                type: CREATE_CATEGORY,
                payload: newCategory
            })
        }
    };

    export function createProduct(payload){
        return async function (dispatch){
            const newProduct = await axios.post(`${SERVER}/products` ,payload)
            return dispatch ({
                type: CREATE_PRODUCT,
                payload: newProduct
            })
        }
    };

    export function createBrands(payload){
        return async function (dispatch){
            const newBrands = await axios.post(`${SERVER}/brands` ,payload)
            return dispatch ({
                type: CREATE_BRANDS,
                payload: newBrands
            })
        }
    };

    export function getProductByName(name) {
        return async function(dispatch){
            try{
                const product = await axios.get(`${SERVER}/products?search=${name}`)
                return dispatch({
                    type: GET_PRODUCT_BY_NAME,
                    payload: product.data
                })
            }catch(err){
                return dispatch({
                    type: GET_PRODUCT_BY_NAME,
                    payload: []
            })}
        }
    };

    export function filterByCategory(payload){
        return {
            type: FILTER_PRODUCTS_BY_CATEGORY,
            payload
        }
    };

    export function filterByPrice(payload){ //ver si tengo ruta
        return{
            type: FILTER_PRODUCTS_BY_PRICE,
            payload
        }
    };

    export function filterProductByBrand(payload){
        return{
            type: FILTER_PRODUCTS_BY_BRANDS,
            payload
        }
    };

    export function sortProducts(payload){
        return {
            type: SORT_PRODUCTS,
            payload
        }
    };

    export function filtersClear(){
        return {
            type: FILTERS_CLEAR,
        }
    }

    export function login(payload){
        return async (dispatch) => {
            //console.log(`http://localhost/login?name=${payload.user.name}&email=${payload.user.email}&password=${payload.user.password}`);
            //let res = await axios(`${SERVER}/${dispatch}`);      
            dispatch({
                isVerified: payload.isVerified,
                user: {
                    token: payload.token,
                    name: payload.name,
                    email: payload.email,  
                    image: payload.image,
                    lastUpdate: 0
                }
            })
        }
    };

    export function logOut(){
        return {
            type: LOGIN,
            payload: {isConnected: false}
        } 
    };

    export function removeCategory(id){
        return async function(dispatch){
            try{
                const categories= await axios.delete(`${SERVER}/categories/${id}`)
                return dispatch({
                    type: REMOVE_CATEGORY,
                    payload: id
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function removeBrands(id){
        try{
            return async function (dispatch){
                const remBrands = await axios.delete(`${SERVER}/brands/${id}`)
                return dispatch ({
                    type: REMOVE_BRANDS,
                    payload: id
                })
            }
        }catch(err){
            console.lor(err)
        }
    };

    export function removeProducts(id){
        try{
            return async function (dispatch){
                const remBrands = await axios.delete(`${SERVER}/brands/${id}`)
                return dispatch ({
                    type: REMOVE_PRODUCT,
                    payload: id
                })
            }
        }catch(err){
            console.log(err)
        }
    };

    export function editCategory(id, name){
        
        try{
            return async function(dispatch){
                console.log('llamada recibida xD')
                console.log(`${SERVER}/categories/${id}`)
                axios.put(`${SERVER}/categories/${id}`,{name: name})
                //console.log(edCategories)
                return dispatch({
                    type: EDIT_CATEGORY,
                    payload: {id, name}
                })
            }
        }catch(err){
            console.log(err)
        }
    };

    export function editBrand(id,name){
        try{
            return async function(dispatch){
                const edBrands= await axios.put(`${SERVER}/brands/${id}`,{name:name})
                return dispatch({
                    type: EDIT_BRANDS,
                    payload: id
                })
            }
        }catch(err){
            console.log(err)
        }
    };

    export function editProduct(id, name, price, stock, sold_quantity, condition, image, thumbnail, attribute, categories, brands) {
        return async function(dispatch){
            try{
                const remProduct= await axios.put(`${SERVER}/products/${id}`, {name: name, price: price, stock: stock, sold_quantity: sold_quantity, condition: condition, image: image, thumbnail: thumbnail, attribute: attribute, categories: categories, brands: brands})
                return dispatch({
                    type: EDIT_PRODUCT,
                    payload: remProduct
                })     
            }catch(err){
                console.log(err)
            }   
        }
    };

    export function addToCart(id){
        try{
            return async function (dispatch){
                const itemCart= await axios.get(`${SERVER}/user/cart/${id}`)
                return dispatch ({
                    type: ADD_TO_CART,
                    payload: itemCart
                })
                }
        }catch(err){
        console.log(err)
        }
    }

    export function removeOneFromCart(id){
        return {
            type: REMOVE_ONE_FROM_CART,
            payload: id
        }
    }

    export function removeAllFromCart(id){
        return{
            type: REMOVE_ALL_FROM_CART,
            payload: id
        }
    }

    export function clearCart(payload){
        return {
            type: CLEAR_CART,
            payload
        }
    }

    
    export function createUser(body) {
        return async function(dispatch){
            try{
                const res = await axios.post(`${SERVER}/user/`, body)
                return dispatch({
                    type: CREATE_USER,
                    payload: res
                })     
            }catch(err){
                console.log(err)
            }   
        }
    };

   



    