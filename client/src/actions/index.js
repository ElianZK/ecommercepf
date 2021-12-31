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
<<<<<<< Updated upstream
    LOGOUT
=======
    LOGOUT,
    ADD_TO_CART,
    ADD_TO_CART_FROM_DB,
    REMOVE_ITEM_FROM_CART_LOCALSTORAGE,
    REMOVE_ITEM_FROM_CART,
    LOCALSTORAGE_CART_TO_DB,
    DB_CART_TO_LOCALSTORAGE,
    CLEAR_CART,
    CREATE_USER,
    GET_PRODUCTS_CART,
    CHANGE_QUANTITY,
    GO_TO_CHECKOUT
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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
        return async function (dispatch){
            try{
                const remBrands = await axios.delete(`${SERVER}/brands/${id}`)
                return dispatch ({
                    type: REMOVE_BRANDS,
                    payload: remBrands
                })
            }catch(err){
                console.lor(err)
            }
        }
    };

    export function removeProducts(id){
        return async function (dispatch){
            try{
                const remProduct = await axios.delete(`${SERVER}/products/${id}`)
                return dispatch ({
                    type: REMOVE_PRODUCT,
                    payload: remProduct
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function editCategory(id, name){
        return async function(dispatch){
            try{
                console.log('llamada recibida xD')
                console.log(`${SERVER}/categories/${id}`)
                axios.put(`${SERVER}/categories/${id}`,{name: name})
                //console.log(edCategories)
                return dispatch({
                    type: EDIT_CATEGORY,
                    payload: {id, name}
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function editBrand(id,name){
        return async function(dispatch){
            try{
                const edBrands= await axios.put(`${SERVER}/brands/${id}`,{name:name})
                return dispatch({
                    type: EDIT_BRANDS,
                    payload: id
                })
            }catch(err){
                console.log(err)
            }
        }
    };
    
    export function editProduct(id, name, price, stock, sold_quantity, condition, image, thumbnail, attribute, categories, brands) {
        return async function(dispatch){
            try{
                const edProduct= await axios.put(`${SERVER}/products/${id}`, {name: name, price: price, stock: stock, sold_quantity: sold_quantity, condition: condition, image: image, thumbnail: thumbnail, attribute: attribute, categories: categories, brands: brands})
                return dispatch({
                    type: EDIT_PRODUCT,
                    payload: edProduct
                })     
            }catch(err){
                console.log(err)
            }
        }   
    };
    
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

    // para boton de carro y cantidades seleccionadas
     export function addToCart(product, userId){ //product es el nuevo q voy incorporando al cart
         return async (dispatch) =>{
             try{
                 if(!userId){
                     const cart = JSON.parse(localStorage.getItem("cart")) || [];
                     const itemFind = false;
                     cart = cart.map((p) => {
                         if(p.id === product.id){
                             itemFind = true;
                             return {
                                 ...p,
                                 quantity: Number(p.quantity) +1
                             }
                         }
                         return p;
                     });
                         if(!itemFind) cart.push(product);
                         localStorage.setItem("cart", JSON.strigify(cart)); //falta autencicacion
                         return dispatch({
                             type: ADD_TO_CART,
                             payload: cart
                         })
                         
                 }else if(userId){
                     const body = {id: product.idProduct, quantity: 1};
                     const cart = await axios.post(`${SERVER}/user/cart/${userId}`,body)
                     return dispatch ({
                         type: ADD_TO_CART_FROM_DB,
                         payload: cart
                     })
                 }
             }catch(err){
                     console.log({msg: 'Item is not Found'}, err)
             }
         }
     }

//me traigo el carro de productos tanto de usuarios como de invitados
export function getProductsCartUser(userId){
        return async function (dispatch){
            try{
                if(!userId){
                    const itemsCart = JSON.parse(localStorage.getItem("cart")) || [];
                    return dispatch({
                        type: GET_PRODUCTS_CART,
                        payload: itemsCart
                    })
                
                }else{
                    const {itemsCart}= await axios.get(`${SERVER}/user/cart/${userId}`)
                    //me creo el elemento order en base a lo que tenia en carrito para ese usuario
                    localStorage.setItem("orderId", itemsCart.orderId) //orderId es el estado para la orden de ese usuario
                    return dispatch ({
                        type: GET_PRODUCTS_CART,
                        payload: itemsCart
                    })
                 }
            }catch(err){
                console.log(err)
            }
        }
    }

    export function localStorageCartToDB(userId){
        return async function(dispatch){
            if(userId){
                try {
                    const body = JSON.parse(localStorage.getItem("cart") || []);
                    const orden = await axios.put(`${SERVER}/user/cart/${userId}`, {products: body})
                    .then((response) => {
                        localStorage.remove("cart");
                        localStorage.setItem("orderId", response.data.orderId);
                        dispatch({
                            type: LOCALSTORAGE_CART_TO_DB,
                            payload: orden
                        })
                    })
                    .catch((error) => console.error(error));
                    
                } catch (err) {
                    console.error({msg: "Error removing form localStorage"}, err)
                    
                }
            }

        }
    };

    export function dbCartToLocalStorage(userId){
        return async function(dispatch){
            try{
                const {data} = await axios.get(`${SERVER}/user/cart/${userId}`);
                console.log(data);
                localStorage.setItem("cart", JSON.stringify(data.products))
                localStorage.setItem("orderId", data.orderId);
                dispatch({
                    type: DB_CART_TO_LOCALSTORAGE,
                    payload: data
                })
            }catch(err){

            }
        }
    }


    export function removeItemFromCart(userId, idproduct){
        return async (dispatch) =>{
            try{
                if(!userId){
                        const products = JSON.parse(localStorage.getItem("cart")) || [];
                        products= products.map((p) => {
                            if(p.id === idproduct){
                                p.quantity = 0;
                                return p;
                            }
                            return p;
                        });
                        localStorage.setItem("cart", JSON.stringify(products));
                        return dispatch({
                            type:  REMOVE_ITEM_FROM_CART_LOCALSTORAGE,
                            payload: products
                        })
                    }
                if(userId){
                        const products = await axios.delete(`${SERVER}/user/cart/${userId}/${idproduct}`)
                        return dispatch({
                            type: REMOVE_ITEM_FROM_CART,
                            payload: products
                    })
>>>>>>> Stashed changes
                }
            }

            console.log(res)
            // res = {status: "failure"}

<<<<<<< Updated upstream
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
=======
    export function removeAllFromCart(userId){
        try {
            return async (dispatch) =>{
            if(!userId){
                localStorage.removeItem("cart");
            }else{
                const cart = await axios.delete(`${SERVER}/user/cart/${userId}`)
                return dispatch({
                    type:CLEAR_CART,
                    payload: cart
                })
            }}     
        }catch(err) {
            console.log({msg: 'Cart not Empty'}, err)
        }
    }


    
    export function changeQuantity(idproduct, quantity, userId){
        return async (dispatch) => {
                try{
                if(userId){
                    const quantityProduct = await axios.put(`${SERVER}/user/cart/${userId}`,{...idproduct, quantity, UserId: userId})
                    return dispatch({
                        type: CHANGE_QUANTITY,
                        payload: quantityProduct
                    })
                }
                if(!userId){
                    const products= JSON.parse(localStorage.getItem("cart"));
                    products = products.map((p) => {
                        if(p.id === idproduct){
                            p.quantity = quantity;
                        }
                        return p
                    });
                    localStorage.setItem("cart", JSON.strigify(products));
                    return dispatch({
                        type: CHANGE_QUANTITY,
                        payload: products
                    })
                }
            }catch(err) {
                console.log(err)
            }
>>>>>>> Stashed changes
        }
        
    }
<<<<<<< Updated upstream
=======
    
   

   
>>>>>>> Stashed changes



    