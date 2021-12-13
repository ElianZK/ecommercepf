import { GET_ALL_PRODUCTS, 
    GET_PRODUCT_BY_NAME,
    GET_PRODUCT_ID,
    GET_ALL_CATEGORIES,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_PRICE,
    FILTER_PRODUCTS_BY_BRANDS,
    SORT_PRODUCTS,
    CREATE_CATEGORY,
    CREATE_PRODUCT,
    FILTERS_CLEAR,
    LOGIN,
    LOGOUT
} from "./actionsTypes";
import axios from 'axios';

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
                const detail= await axios.get(`http://localhost:3001/products/${idProduct}`)
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
                const categories= await axios.get('http://localhost:3001/categories?all=true')
                return dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: categories.data
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function createCategory(payload){
        return async function (dispatch){
            const newCategory = await axios.post( '',payload)
            return dispatch ({
                type: CREATE_CATEGORY,
                payload: newCategory
            })
        }
    };

    export function createProduct(payload){
        return async function (dispatch){
            const newProduct = await axios.post('' ,payload)
            return dispatch ({
                type: CREATE_PRODUCT,
                payload: newProduct
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
    }

    export function filterProductByBrand(payload){
        return{
            type: FILTER_PRODUCTS_BY_BRANDS,
            payload
        }
    }

    export function sortProducts(payload){
        return {
            type: SORT_PRODUCTS,
            payload
        }
    };

    export function filtersClear(){
        return {
            type: FILTERS_CLEAR
        }
    }

    export function login(payload){
        let res = null;
        return async (dispatch) => {
            if(payload.submitType === "login"){
                // console.log(`http://localhost/login?name=${payload.user.name}&email=${payload.user.email}&password=${payload.user.password}`);
                
                // res = await axios(`http://localhost/login?name=${payload.user.name}&email=${payload.user.email}&password=${payload.user.password}`);      
            }else{
                var {user} = payload;
                console.log(`http://localhost/login?name=${user.givenName}&email=${user.email}`);

                //res = await axios(`http://localhost/login?name=${payload.user.name}&email=${payload.user.email}`);
            }
            
            res = {
                isConnected: true,
                user: {
                    name: user.givenName || "",
                    email: user.email || ""
                }
            }

            console.log(res)
            // res = {status: "failure"}

            return dispatch({
                type: LOGIN,
                payload: res
            })
        }
    }

    export function logOut(){
        return {
            type: LOGIN,
            payload: {isConnected: false}
        }
        
    }



    