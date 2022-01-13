import { GET_ALL_PRODUCTS, 
    GET_PRODUCT_BY_NAME,
    GET_PRODUCT_ID,
    GET_ALL_CATEGORIES,
    GET_ALL_BRANDS,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_PRICE,
    FILTER_PRODUCTS_BY_BRANDS,
    ADMIN_FILTER_ORDERS_BY_STATE,
    ADMIN_FILTER_ORDERS_BY_PRICE,
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
    //CREATE_USER,
    ADD_TO_CART,
    ADD_TO_CART_FROM_DB,
    GET_PRODUCTS_CART,
    CHANGE_QTY,
    CLEAR_CART,
    UPDATE,
    CREATE_USER,
    GET_USERS,
    UPDATE_USER,
    SET_ORDER_PRODUCTS,
    CHECK_TYPE,
    CREATE_REVIEWS,
    GET_REVIEWS,
    GET_WISHLIST,
    UPDATE_WISHLIST,
    DELETE_REVIEW,
    UPDATE_REVIEW,
    GET_ALL_ORDERS,
    GET_USER_INFO,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDERS,
    BUY_PRODUCT,
} from "./actionsTypes";
import axios from 'axios';


const SERVER = 'http://localhost:3001';
// const SERVER = 'https://e-commerce-pf.herokuapp.com';


    export function getAllProducts(data,all=false) {
        
        return async function(dispatch){

            try{
                let products=null;
                if(all){
                    products = await axios.get(`${SERVER}/products?all=true`);
                }else{
                    let {offset=0, limit=25, search=null, minPrice=0,  maxPrice=null,brand = null, category=null, sort=null} = data;
                    search= search? `&name=${search}`:'';
                    minPrice= minPrice?`&minPrice=${minPrice}`: '';
                    maxPrice=maxPrice?`&maxPrice=${maxPrice}`:'';
                    brand=brand? `&brand=${brand}`:'';
                    category=category? `&category=${category}`:'';
                    sort= sort? `&sort=${sort}`:'';
                    //console.log(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}`)
                    products = await axios.get(`${SERVER}/products?offset=${offset}&limit=${limit}${maxPrice}${minPrice}${brand}${category}${sort}${search}`);
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

    /* export function AutoComplete(name){
        return async function(dispatch){
            products = await axios.get(`${SERVER}/products?name=${name}`);
            return dispatch({
                type: SET_AUTOCOMPLETE,
                payload: detail.data
            })
        }
    } */

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
                console.log("no hay cateegorías", err)
            }
        }
    };

    export function getBrands(category=''){
        return async function(dispatch){
            try{
              let aux=''  
              if(!category)  aux=`?category=${category}`
              const brands= await axios.get(`${SERVER}/brands${aux}`)
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

    export function filterByPrice(payload){ 
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

    export function createUser(body, from="user") {
        return async function(dispatch){
            try{
                console.log(body)
                const res = await axios.post(`${SERVER}/users/create`, {...body, from})

                console.log(res.data);

                return dispatch({
                    type: from==="user" ? CREATE_USER : GET_USERS,
                    payload: res.data
                })     
            }catch(e){
                return dispatch({
                    type: CREATE_USER,
                    payload: {error: true, message: "No se pudo crear la cuenta, revise los datos"}
                }) 
            }
        }
    };

    export function clearRegisterInfo(){
        return{
            type: CREATE_USER,
            payload: null
        }
    }

    export function login(payload){
      return async function(dispatch){
        if(payload.idUser){
          try{
            payload["accountType"] = "external";

            const res = await axios.post(`${SERVER}/user/login`, payload);

            let data = {
              user: {
                ...res.data
              },
              isVerified: false,
              error: false,
              lastUpdate: 0,
            }

            localStorage.setItem("user", JSON.stringify(data.user));

            return dispatch({
              type: LOGIN,
              payload: {
                ...data,

              }
            });
          }catch(e){
            return dispatch({
              type: LOGIN,
              payload: {
                isVerified: false,
                user: {idUser: null},
                error: true,
                lastUpdate: 0,
              }
            });
          }
        }else{
          localStorage.setItem("user", JSON.stringify({
            isVerified: false,
            user: {idUser: null},
            error: true,
            lastUpdate: 0,
          }))
          return dispatch({
            type: LOGIN,
            payload: {
              isVerified: false,
              user: {idUser: null},
              error: null,
              lastUpdate: 0,
            }
          });
        }
      }
    }; 

    export function loginWithNormalAccount(payload){
        return async function(dispatch){
            try{
                payload["accountType"] = "internal";
                const res = await axios.post(`${SERVER}/user/login`, payload);
                let data = {
                    lastUpdate: 0,
                    isVerified: false,
                    user: {
                        ...res.data
                    },
                    error: false
                }
                localStorage.setItem("user", JSON.stringify(data.user));

                return dispatch({
                    type: LOGIN,
                    payload: {
                        ...data,
                    }
                });
            }catch(e){
                return dispatch({
                    type: LOGIN,
                    payload: {
                        lastUpdate: 0,
                        isVerified: false,
                        user: {idUser: null},
                        error: true
                    }
                });
            }
        }
    }

    export function logOut(){
        return {
            type: LOGIN,
            payload: {isConnected: false}
        } 
    };

    export function checkType(/*id*/){
        return{
            type: CHECK_TYPE,
            payload: {isAdmin: true}
        }
    }

    export function removeCategory(id){
        return async function(dispatch){
            try{
                await axios.delete(`${SERVER}/categories/${id}`)
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
                axios.put(`${SERVER}/categories/${id}`,{name: name})
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

    export function editProduct(payload) {
        return async function(dispatch){
            try{
                const edProduct= await axios.put(`${SERVER}/products/${payload.idProduct}`, payload);
                return dispatch({
                    type: EDIT_PRODUCT,
                    payload: edProduct
                })     
            }catch(err){
                console.log(err)
            }
        }   
    };
    
   // me traigo el carro de productos tanto de usuarios como de invitados

     export function getProductsCartUser(userId){
         //console.log("getproductscart",userId)
         return async function (dispatch){
                 try{
                 if(!userId){
                     //console.log("condicion nousuario cart")
                     const itemsCart = JSON.parse(localStorage.getItem("cart")) || [];
                     return dispatch({
                         type: GET_PRODUCTS_CART,
                         payload: itemsCart
                     })
                 
                 }else{
                    //localStorageCartToDB(userId)
                    const {data}= await axios.get(`${SERVER}/users/cart/${userId}`)
                    
                    /* dispatch({
                        type: CLEAR_CART
                    }) */
                    const localCart = JSON.parse(localStorage.getItem("cart")) || [] //orderId es el estado para la orden de ese usuario
                    localStorage.removeItem("cart")
                    const res= await axios.put(`${SERVER}/users/cart/${userId}`,{productsInfo: [...data.cart,...localCart]})
                     return dispatch ({
                         type: GET_PRODUCTS_CART,
                         payload: res.data.cart
                     })
                  }
             }catch(err){
                 console.log(err)
             }
         }
     }
    
    
    //para boton de carro y cantidades seleccionadas
    
    export const addToCart = (product, userId,cart) => (dispatch) => {
        //console.log('jo',product)
        if (!userId) {
            let products = JSON.parse(localStorage.getItem("cart")) || [];
          let productFind = false;
          products = products.map((p) => {
              
            if (p.idProduct === product.idProduct ) {
                  productFind = true;
              return {
                    ...p,
                    //qty: Number(p.qty) + 1,
                    amount: Number(p.amount) + product.amount<=p.stock?Number(p.amount) + product.amount:p.amount,
                }; 
            }
            return p;
          });
          
           if (productFind===false){ 
              products.push(product);
              //console.log(products)
          }
          products= products.filter(p=>p.amount>0)
          localStorage.setItem("cart", JSON.stringify(products));
          return dispatch({ 
              type: ADD_TO_CART,
              payload: products });/* */
        }
      if (userId) {
          let exits=false;
          let aux= Array.isArray(cart)?cart.map(p=>{
              if(p.idProduct===product.idProduct){
                exits=true;
                return {
                    ...p,
                    amount: Number(p.amount)+Number(product.amount)
                }
              }
              return p;
          }):[]

          if(!exits) aux=[...aux, product]


          const body = {productsInfo: aux}//[{...product}/* id: product.idProduct, qty: 1  */]};
          //console.log('lo',product.idProduct)
          return axios
            .put(`${SERVER}/users/cart/${userId}`, body) //fatlta autenci usuario
            .then((response) => {

                //console.log("putproductadd",response)
               // localStorage.setItem("cart", JSON.stringify(response.data.cart));
              dispatch({ 
                  type: ADD_TO_CART_FROM_DB,
                  payload: response.data.cart 
                });
            })
            .catch((error) => console.error(error));
        } 
    };
  
    export function deleteItemFromCart(idProduct, userId){
        //console.log("Id a eliminar", idProduct)
        //console.log("Id usuariocart a eliminar", userId)
        return async (dispatch) =>{
            try{
                if(!userId){
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    let itemFind = false;
                    cart = cart.map((p) => {
                        //console.log("map",p)
                        if(p.idProduct === idProduct){
                            //console.log("item coincidente")
                            itemFind = true;
                            return {
                                ...p,
                                amount: 0
                            }
                        }
                        return p;
                    });
                    cart = cart.filter(p=>p.amount>0)
                    localStorage.setItem("cart", JSON.stringify(cart));
                    return dispatch ({
                        type: GET_PRODUCTS_CART,
                        payload: cart
                    })
                    /* return dispatch({
                        type: DELETE_ITEM_FROM_CART_LOCALSTORAGE,
                        payload: {idProduct}
                    }) */
                }
                else{
                    const {data} = await axios.delete(`${SERVER}/users/cart/${userId}?idProduct=${idProduct}`)
                    //console.log("deleteitem",data.cart)
                    return dispatch ({
                        type: GET_PRODUCTS_CART,
                        payload: data.cart
                    })
                }
            
            }catch(err){
                console.log({msg: 'Item not remove'}, err)
            }
        }
    }

    export function buyProduct(idProduct){
        return async (dispatch) => {
            const res = await axios.get(`${SERVER}/products/${idProduct}`);

            const product = {
                idProduct: res.data[0].idProduct,
                name: res.data[0].name,
                price: res.data[0].price,
                stock: res.data[0].stock,
                image: res.data[0].image,
                amount: 1,
                totalPrice: res.data[0].price
            };

            return dispatch({
                type: BUY_PRODUCT,
                payload: product
            })
        }
    }

    export function clearProduct(){
        return {
            type: BUY_PRODUCT,
            payload: null
        }
    }
    
    export function changeAmount(products, userId){
        try{
            return async (dispatch) => {
                if(userId){
                    const qtyProduct = await axios.put(`${SERVER}/users/cart/${userId}`,{productsInfo: products})
                    //console.log("changeamountuser",qtyProduct)
                    return dispatch({
                        type: CHANGE_QTY,
                        payload: qtyProduct.data.cart
                    })
                }
                if(!userId){
                    //const products= JSON.parse(localStorage.getItem("cart"));
                    localStorage.setItem("cart", JSON.stringify(products));
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

    export function getAllUsers(){
        return async function(dispatch){
            try{
                const res = await axios.get(`${SERVER}/users/all`);

                const users = res.data.userinfo;

                return dispatch({
                    type: GET_USERS,
                    payload: users
                })         
            }catch(e){
                
            }
        }
    }

    export function updateUser(id, user, from="admin"){
        return async function(dispatch){
            try{
                const res = await axios.put(`${SERVER}/users/${id}`, {...user, from});
                await axios.put("http://localhost:3001/user/"+id, {value: false});

                const payload = {
                    user: res.data,
                    from
                }

                //console.log("payload armado", payload)

                return dispatch({
                    type: UPDATE_USER,
                    payload,
                });
            }catch(e){
                console.log("no se pudo actualizar el user", e)
            }
        }
    }

    export function deleteUser(id){
        return async function(dispatch){
            try{
                //console.log("voy a eliminar al user " + id);
                await axios.delete(`${SERVER}/users/${id}`);

                const res = await axios.get(`${SERVER}/users`);

                const users = res.data.userinfo;

                return dispatch({
                    type: GET_USERS,
                    payload: users
                })    
            }catch(e){
                console.log("no se pudo eliminar el user" , e)
            }
        }
    }
          

    export function update(payload) {
        return {
            type: UPDATE,
            payload
        };
    }
    
    export function clearCart(idUser){
        return async function(dispatch){
            if(idUser)
                await axios.delete(`${SERVER}/users/cart/${idUser}`);
            localStorage.removeItem("cart")
            return dispatch({
                type: CLEAR_CART,
                payload: []
            })
        }
    } 

    export function setOrderProducts(pay, idUser,oneP){
        return async function(dispatch){
            console.log(oneP)
            const postOrder = await axios.post(`${SERVER}/users/order/${idUser}`, pay)
            //if(!oneP)clearCart(idUser)
            return dispatch ({
                type: SET_ORDER_PRODUCTS,
                payload: postOrder
            })
        }

    }

    export function getOrderProducts(idUser){
        return async function(dispatch){
            // console.log("getorder",idUser)
            const {data} = await axios.get(`${SERVER}/users/orders/${idUser}`)
            //console.log(data)
            
            return dispatch ({
                type: SET_ORDER_PRODUCTS,
                payload: {
                    orderId: [],
                    orders: data.orders
                }
            }) /**/
        }

    }
    
    export function getWishList(idUser){
      return async function(dispatch){
        if(!idUser) return;
        try {
          let response = await axios.get(`http://localhost:3001/users/wishlist/${idUser}`);
          dispatch({
            type:GET_WISHLIST,
            payload: response.data.wishList
          })
        } catch (error) {
          
        }
      };
    }
    export function addItemToWishList(idUser,idProduct){
      return async function(dispatch){
        try {
          let response = await axios.post(`http://localhost:3001/users/wishlist/${idUser}/${idProduct}`);
          if(response.data.created){
            dispatch({
              type: UPDATE_WISHLIST,
              payload:response.data.wishList
            })
          }
          return;
        } catch (error) {
          console.log("addItemToWishList action error: ", error);
        }
      }
    }
   
    
    export function deleteItemFromWishList(idUser,idProduct){
      return async function(dispatch){
        try {
          let response = await axios.delete(`http://localhost:3001/users/wishlist/${idUser}/${idProduct}`);
          if(response.data.deleted){
            dispatch({
              type: UPDATE_WISHLIST,
              payload:[...response.data.wishList]
            })
          }
          return;
        } catch (error) {
          console.log("deleteItemToWishList action error: ", error);
        }
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
    
    //CreateReview crea una puntuacion y comentario 
    export function createReview(id,review){
        console.log('object :>> ', id);
        return dispatch => {
            axios.post(`http://localhost:3001/product/${id}/review`,review)
            .then((result) => {
                return dispatch({
                    type:CREATE_REVIEWS,
                    payload: result.data
                })
            }).catch((err) => {
                console.log('err :>> ', err);
            });
        }

    }

    //obtengo todos mis comentarios por ID de producto
    export function get_Review(id){
        return dispatch => {
            axios.get(`http://localhost:3001/product/${id}/review`)
            .then((result) => {
                return dispatch({
                    type:GET_REVIEWS,
                    payload:result.data
                })
            }).catch((err) => {
                console.log('err :>> ', err);
            });
        }
    }


  export function updateOrderDispatched(orderId, status,email){
      console.log("actualizacion de order", email)
    return async function (dispatch){
      let updated = await axios.put(`${SERVER}/admin/order/${orderId}`, {dispatched:status,email});
      return dispatch({
        type: UPDATE_ORDERS,
        payload: {
          id:orderId,
          status}
      })
    }
  }
    export function eliminar_review(prod,id){
        return dispatch => {
            axios.delete(`http://localhost:3001/product/${prod}/review/${id}`)
            .then((result) => {
                console.log('result :>> ', result.data);
                return dispatch({
                    type:DELETE_REVIEW,
                    payload:result.data
                })
            }).catch((err) => {
                console.log('err :>> ', err);
            });
        }
    }

    export function update_review(prod,id,values){
        return dispatch => {
            axios.put(`${SERVER}/product/${prod}/review/${id}`,values)
            .then((result) => {
                console.log('result :>> ', result.data);
                return dispatch({
                    type:UPDATE_REVIEW,
                    payload:result.data
                })
            }).catch((err) => {
                console.log('err :>> ', err);
            });
        }
    }

export function getAllOrders() {
    return async function (dispatch) {
        const {data} = await axios.get(`${SERVER}/admin/orders`)
        console.log("DAT: ", data);
        return dispatch({
            type: GET_ALL_ORDERS,
            payload: data.orders
        })
    }
}

export function adminFilterOrdersByState(value){
    return{
        type: ADMIN_FILTER_ORDERS_BY_STATE,
        payload: value
    }
}

export function adminFilterOrdersByPrice(payload){
    return{
        type: ADMIN_FILTER_ORDERS_BY_PRICE,
        payload
    }
}

export function getUserInfo(userId){
    return async function dispatch(payload){
        const user = await axios.get(`${SERVER}/users/${userId}`)
        return dispatch({
            type: GET_USER_INFO,
            payload: user
        })
    }
}

