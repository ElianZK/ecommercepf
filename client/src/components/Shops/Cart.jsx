import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/Cart.module.css'
import {getProductsCartUser, deleteAllCart, changeQty, deleteItemFromCart, clearCart} from '../../actions/index'
import Swal from 'sweetalert2';
import { Link, useParams} from 'react-router-dom';
import DataTable from 'react-data-table-component';





 function Cart() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.ordenReducer.cart);
    const[qty, setQty] = useState(products.qty);
    const userId = useParams()
    //const userId = Cookies.get('id');

    useEffect(() => {
        dispatch(getProductsCartUser(userId)); 
    }, [dispatch, userId]); 

    const handleDeleteItem = (e) => {
        e.preventDefault()
        dispatch(deleteItemFromCart((userId, products.idproduct ? products.idproduct : products.id)))
    }

    const handleChangeQty = (e) => {
        e.preventDefault()
        const { value } = e.target;
        if (value <= products.stock && value >= 1) {
            setQty(value);
            dispatch(changeQty(products, e.target.value, userId));
        };
    }


    function handleDeleteAll(e){
        e.preventDefault()
         dispatch(deleteAllCart(userId))   
    }

    function handleClearCart(e){
        e.preventDefault()
        dispatch(clearCart())
    }

    // const handleGoToCheckout= () => {
    //     dispatch(goToCheckout(products, userId ))
    // }

    const totalIncludeDesc = () => {
        products.length && products.reduce((totalWithoutDesc, { price, qty }) => 
        totalWithoutDesc + (price * qty), 0);
    }

    const total = products.length && products.reduce((total, { price, qty, perc_desc }) => 
        total + price * qty * (100 - perc_desc) / 100, 0);

    const desc = () => {
        products.length && products.reduce((desc, { price, qty, perc_desc }) => 
        desc + perc_desc * price * qty / 100, 0);
    }


    // const cartList=[]
    // let amount = 0;  
    // for (const i in products) {
    //  cartList.push(products[i]);
    //  amount += products[i].price*products[i].qty 
    // }


    const columns=[
       

        {
            name: "Image",   
            grow: 0,
            sortable: true,
            cell: row => <img height="84px" width="56px" alt={row.name} src={row.image} />
        },
        {
            name: "Name",
            selector:row => row.name,
            sortable: true
        },
    
        {
            name: "Price",
            selector:row => row.price,
            sortable: true
        },

        {
            name: "Quantity",
            selector: row => row.qty,
            sortable: true
        },

        {
            name:"Total Amount",
            selector:row => row.amount,
            sortable: true
        },

        {
            cell: () => <button onClick={handleChangeQty}>+</button>,
            ignoreRowClick: false,
            allowFlow: true,
            button: true
            
        },

        {
            cell: () => <button onClick={ handleDeleteItem}>-</button>,
            ignoreRowClick: true,
            allowFlow: true,
            button: true
            
        },

        {
            cell: () => <button onClick={handleDeleteAll}>REMOVE</button>,
            ignoreRowClick: true,
            allowFlow: true,
            button: true
            
        }
    ]

    const optionPagination = {
        rowsPerPageText: "Files per Page",
        rangesSeparatorText: "of",
        selectAllRowsItem: true,
        selectAllRowsItemText: "All"
    }

    
    return (
        <>
    
        {/* {cartList.length >0 ? cartList.map((p) => {
                    return (
                        <><div key={p.id}>
                            <img src={p.image} alt={p.name} />

                            <p> {p.name}</p>
                        </div><div>
                                <p><span>$</span>{p.price}</p>
                            </div><div> {p.qty}  </div><div>{p.amount}</div></>
                                   
                    )}):<span>Cart is Empty</span>
                } */}


        <div className={s.container}>
        <DataTable
            title ="My Shopping Cart"
            columns = {columns}
            data = {products}
            //selectableRows
            // onSelectedRowsChange={handleRowSelected}
			// clearSelectedRows={toggleCleared}
        
            pagination
            paginationComponentOptions = {optionPagination}
            actions
            > </DataTable>

<button><Link to='/'><span>Go More Shopp</span></Link></button>
<button><Link to='/checkout'><span>Confirm Your Purchase</span></Link></button>
<button onClick={handleClearCart}>CLEAR CART</button>



          {/* </div>
         
            <div className={s.container}>
                 <h2>Shopping Cart</h2>
                     <h3>Products</h3>
              {cartList.length ? 
                   <div>
                       {cart.map((p) => {
                    return (
                        <div key={p.id}> 
                            <img src={p.thumbnail} alt={p.name}/>
                                <button  onClick={()=> dispatch(removeAllFromCart(p.id, p.quantity))}></button>
                               <p>Producto:  {p.name}</p>
                            <div>
                                <p>Price per unitity: <span>$</span>{p.price}</p>  
                            </div>
                               <div>  Quantity: {p.quantity}  </div>
                                    <div > Amount: ${p.price * p.quantity}</div>
                                <div>
                                    <button>Add</button>
                                </div>
                                <div>
                               <button  onClick={()=> dispatch(removeOneFromCart(p.id, p.quantity))} >Substract</button>
                            </div>
                           </div>)
                        })
                    }
                    </div> : (<p>Your Cart is Empty</p>)
                }
            <div>
                {cartList.length !== 0 ? (
                    <div>
                        <p><span>Total Amount:</span> <span>$</span>{totalAmount.toFixed(2)} </p> <hr />
                        <button onClick={() => dispatch(removeAllFromCart(cartList))}>Clean Cart</button>
                    </div>) : null}
                <div>
                    <Link to='/checkout'><span>Confirm Your Purchase</span></Link>
                </div>
                </div>
                </div>
            
        
          */}
         
          </div>
        </>
    )
}
export default Cart