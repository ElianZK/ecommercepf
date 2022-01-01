import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/Cart.module.css'
import {removeFromCart, changeQty, addToCart, clearCart,update} from '../../actions/index'
import Swal from 'sweetalert2';
import { Link, useHistory, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';




export default function Cart() {
    const {idproduct} = useParams();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.ordenReducer.cart);
    const product = useSelector(state => state.productsReducer.productDetail[0])
    const [selectedRows, setSelectedRows] = useState([]);
    //const user = useSelector((state) => state.userReducer.users)
    const qty = window.location.search? Number(window.location.search.split('=') [1]) : 1;

    useEffect(() => {
        if(idproduct) {
          dispatch(addToCart(idproduct, qty));
        }
      }, [dispatch, idproduct, qty]);




    function handleRemoveFromCart(e){
        e.preventDefault();
        let action = window.confirm('Are you sure you want to remove item?')
        if(action){
            dispatch(removeFromCart(e))
        }
    }

    function handleChangeQty(e, item){
        e.preventDefault()
        dispatch(changeQty({id:item.idproduct, qty:Number(e.target.value)}))
        dispatch(update())
    }

    const handleChange = () =>(state => {
		setSelectedRows(state.selectedRows);
	}, []);

   

    const cartList=[]
    let totalAmount = 0;  
    for (const i in cart) {
        cartList.push(cart[i]);
        totalAmount += cart[i].price*cart[i].qty 
    }



    const columns=[
        {
            name: "Id",
            selector: row => row.id,
            sortable: true
        },

        {
            name: "Image",
            selector: row=>row.image,
            sortable: true
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
            selector:row=> row.totalAmount,
            sortable: true
        },

        {
            cell: () => <button onClick={handleChangeQty}>+</button>,
            ignoreRowClick: false,
            allowFlow: true,
            button: true
            
        },

        {
            cell: () => <button onClick={handleChangeQty}>-</button>,
            ignoreRowClick: true,
            allowFlow: true,
            button: true
            
        },

        {
            cell: () => <button onClick={handleRemoveFromCart}>REMOVE</button>,
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
    
        {cart.length >0?cart.map((p) => {
                    return (
                        <><div key={p.id}>
                            <img src={p.thumbnail} alt={p.name} />

                            <p> {p.name}</p>
                        </div><div>
                                <p><span>$</span>{p.price}</p>
                            </div><div> {p.qty}  </div><div><span>$</span>{totalAmount}</div></>
                                   
                    )}):<span>Cart is Empty</span>
                }


        <div className={s.container}>
        <DataTable
            title ="My Shopping Cart"
            columns = {columns}
            data = {cartList}
            selectableRows
            onSelectedRowsChange={handleChange}
        
            pagination
            paginationComponentOptions = {optionPagination}
            actions
            > </DataTable>

<Link to='/'><span>Go More Shopp</span></Link>
<Link to='/checkout'><span>Confirm Your Purchase</span></Link>



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
