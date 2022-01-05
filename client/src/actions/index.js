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
    //CREATE_USER,
    ADD_TO_CART,
    ADD_TO_CART_FROM_DB,
    DELETE_ITEM_FROM_CART,
    DELETE_ITEM_FROM_CART_LOCALSTORAGE,
    DELETE_ALL_CART,
    CART_FROM_LOCALSTORAGE_TO_DB,
    CART_FROM_DB_TO_LOCALSTORAGE,
    GET_PRODUCTS_CART,
    CHANGE_QTY,
    CLEAR_CART,
    UPDATE,
    CREATE_USER,
    GET_USERS,
    UPDATE_USER
} from "./actionsTypes";
import axios from 'axios';


const SERVER = 'http://localhost:3001';


    export function getAllProducts(data,all=false) {
        
        return async function(dispatch){

            try{
                let products=null;
                if(all){
                    products = await axios.get(`${SERVER}/products?all=true`);
                }else{
                    let {offset=0, limit=25, minPrice= null,  maxPrice= null,brand = null, category=null} = data
                    minPrice= minPrice?`&minPrice=${minPrice}`: '';
                    maxPrice=maxPrice?`&maxPrice=${maxPrice}`:'';
                    brand=brand? `&brand=${brand}`:'';
                    category=category? `&category=${category}`:'';
                    //console.log(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}`)
                    products = await axios.get(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}`);
                }
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
            try{
                const newCategory = await axios.post(`${SERVER}/categories`, payload)
                return dispatch ({
                    type: CREATE_CATEGORY,
                    payload: newCategory
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function createProduct(payload){
        return async function (dispatch){
            try{
                const newProduct = await axios.post(`${SERVER}/products` ,payload)
                return dispatch ({
                    type: CREATE_PRODUCT,
                    payload: newProduct
                })
            }catch(err){
                console.log(err)
            }
        }
    };

    export function createBrands(payload){
        return async function (dispatch){
            try{
                const newBrands = await axios.post(`${SERVER}/brands` ,payload)
                return dispatch ({
                    type: CREATE_BRANDS,
                    payload: newBrands
                })
            }catch(err){
                console.log(err)
            }
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
        let data={
            isVerified: payload.isVerified,
            user: {
                token: payload.id,
                name: payload.name,
                email: payload.email,  
                image: payload.photo,
                lastUpdate: 0
            }
        }
        console.log(data)
        return {
            type: LOGIN,
            payload:data
        } 
        //}
    }; /*/**/

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
                const res = await axios.post(`${SERVER}/users/create`, body)

                console.log("tengo", res);

                return dispatch({
                    type: CREATE_USER,
                    payload: res.data
                })     
            }catch(e){
                console.log("hubo un error", e);
            }
        }
    };

    
   // me traigo el carro de productos tanto de usuarios como de invitados

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
    
    
    //para boton de carro y cantidades seleccionadas
    
    export const addToCart = (product, userId) => (dispatch) => {
        console.log(product)
        if (!userId) {
            let products = JSON.parse(localStorage.getItem("cart")) || [];
          let productFind = false;
          products = products.map((p) => {
              
            if (p.idProduct === product.idProduct) {
                  productFind = true;
              return {
                    ...p,
                    //qty: Number(p.qty) + 1,
                    qty: Number(p.qty) + product.qty,
                }; 
            }
            return p;
          });
           if (productFind===false){ 
              products.push(product);
              console.log(products)
          }
          products= products.filter(p=>p.qty>0)
          localStorage.setItem("cart", JSON.stringify(products));
          return dispatch({ 
              type: ADD_TO_CART,
              payload: products });/* */
        }
      if (userId) {
          const body = { id: product.id, qty: 1 };
          return axios
            .post(`${SERVER}/user/cart/${userId}`, body) //fatlta autenci usuario
            .then((response) => {
              dispatch({ 
                  type: ADD_TO_CART_FROM_DB,
                  payload: response.data 
                });
            })
            .catch((error) => console.error(error));
        } 
    };
      
    
    export function deleteItemFromCart(userId, idProduct){
        console.log("Id a eliminar", idProduct)
        return async (dispatch) =>{
            try{
                if(!userId){
                    console.log("user null")
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];
                        let itemFind = false;
                        cart = cart.map((p) => {
                            console.log("map",p)
                            if(p.idProduct === idProduct){
                                console.log("item coincidente")
                                itemFind = true;
                                return {
                                    ...p,
                                    qty: Number(p.qty) -1
                                }
                            }
                            return p;
                        });
                        cart = cart.filter(p=>p.qty>0)
                        localStorage.setItem("cart", JSON.stringify(cart));
                        return dispatch({
                            type: DELETE_ITEM_FROM_CART_LOCALSTORAGE,
                            payload: {idProduct}
                        })
                    }
                    if(userId){
                        const cart = await axios.delete(`${SERVER}/user/cart/${userId}/${idProduct}`)
                        return dispatch({
                            type: DELETE_ITEM_FROM_CART,
                            payload: cart
                    })
                }
            }catch(err){
                console.log({msg: 'Item not remove'}, err)
            }
        }
    }
    
    
    export function deleteAllCart(userId){
        try {
            return async (dispatch) =>{
            if(!userId){
                localStorage.removeItem("cart");
            }else{
                const cart = await axios.delete(`${SERVER}/user/cart/${userId}`)
                return dispatch({
                    type: DELETE_ALL_CART,
                    payload: cart
                })
            }}     
        }catch(err) {
            console.log({msg: 'Cart not Empty'}, err)
        }
    }

    export function changeQty(idProduct, qty, userId){
        try{
            return async (dispatch) => {
                if(userId){
                    const {qtyProduct} = await axios.put(`${SERVER}/user/cart/${userId}`,{...idProduct, qty, id: userId})
                    return dispatch({
                        type: CHANGE_QTY,
                        payload: qtyProduct
                    })
                }
                if(!userId){
                    const products= JSON.parse(localStorage.getItem("cart"));
                    products = products.map((p) => {
                        if(p.id === idProduct){
                            p.qty = qty;
                        }
                        return p
                    });
                    localStorage.setItem("cart", JSON.strigify(products));
                    return dispatch({
                        type: CHANGE_QTY,
                        payload: products
                    })
                }
            }
        }catch(err) {
            console.log(err)
        }
    }
    
    export const localStorageCartToDB = (userId, headers) => async (dispatch) => {
        if (userId) {
            try {
                let body = JSON.parse(localStorage.getItem("cart")) || [];
                axios
                .put(`/orders/${userId}`, {products: body})  //falta autent de usuario
              .then((response) => {
                  localStorage.removeItem("cart");
                  localStorage.setItem("orderId", response.data.orderId);
                  dispatch({
                    type: CART_FROM_LOCALSTORAGE_TO_DB,
                    payload: response.data,
                });
            })
            .catch((error) => console.error(error));
            } catch (error) {
                console.error(
              "removeStorage: Error removing key cart from localStorage: " + JSON.stringify(error)
                );
            }
        }
    };
      
    /*   export const DBcartToLocalStorage = ({userId: userId}) => async (dispatch) => {
          try {
            const { data } = await axios.get(`${SERVER}/user/cart/${userId}`); //falta aut para usuario
            console.log(data);

          localStorage.setItem("cart", JSON.stringify(data.products));
          localStorage.setItem("orderId", data.orderId); 
          dispatch({ 
              type: CART_FROM_DB_TO_LOCALSTORAGE,
               payload: data });

        } catch (error) {
            console.error(error);
        }
    };
          */
    export function getUsers(){
        return async function(dispatch){
            try{
                const res = await axios.get(`${SERVER}/users`);

                const users = res.data.userinfo;

                return dispatch({
                    type: GET_USERS,
                    payload: users
                })     
            }catch(e){
                
            }
        }
    }

    export function updateUser(id, user){
        return async function(dispatch){
            try{
                console.log("voy a updatear el user " + id)

                const res = await axios.put(`${SERVER}/users/${id}`, user)

                console.log("se actualizó el user",res);

                return dispatch({
                    type: UPDATE_USER,
                    payload: id
                })
            }catch(e){
                console.log("no se pudo actualizar el user", e)
            }
        }
    }

          

    export function update(payload) {
        return {
            type: UPDATE,
            payload
        };
    }
    
    export function clearCart(payload){
        return {
            type: CLEAR_CART,
            payload
        }
    } 
    
    
    
    
    //   export const getAllFavourites = () => async (dispatch) => {
    //     try {
        //       const { data } = await axios.get(`/users/favs`, { headers });
        //       dispatch({ type: GET_FAVOURITES, payload: data });
    //     } catch (error) {
        //       console.error(error);
    //     }
    //   };
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    
   