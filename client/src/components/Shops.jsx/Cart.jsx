import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/Cart.module.css'
import {removeOneFromCart, removeAllFromCart, addToCart} from '../../actions/index'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';




export default function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.ordenReducer.cart)
    const [select, setSelect] = useState([]);

    useEffect(() => {
        dispatch(removeAllFromCart());
        dispatch(addToCart())

        dispatch(removeOneFromCart())
        
    }, [dispatch])

    function handleButtonClick(e){
        e.preventDefault();
        setSelect(e.target.value)
    }
    

    const cartList=[]
    let totalAmount = 0;  
    for (const i in cart) {
        cartList.push(cart[i]);
        totalAmount += cart[i].price*cart[i].quantity 
    }



    const columns=[
        {
            name: "Id",
            selector: "id",
            sortable: true
        },

        {
            name: "Image",
            selector: "image",
            sortable: true
        },
        {
            name: "Name",
            selector: "name",
            sortable: true
        },
    
        {
            name: "Price",
            selector: "price",
            sortable: true
        },

        {
            name: "Quantity",
            selector: "quantity",
            sortable: true
        },

        {
            name:"total Amount",
            selector:"totalAmount",
            sortable: true
        },

        {
            name:"Actions",
            selector:"add",
            sortable: true,
            
        },

        {
            cell: () => <button onClick={handleButtonClick}>ADD </button>,
            ignoreRowClick: true,
            allowFlow: true,
            button: true
            
        },

        {
            cell: () => <button onClick={handleButtonClick}>DELETE</button>,
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
        <div className={s.container}>
        <DataTable
            title ="My Shopping Cart"
            columns = {columns}
            data = {cartList}
            selectableRows
            //onSelectedRowsChange={handleChange}
        
            pagination
            paginationComponentOptions = {optionPagination}
            actions
            > </DataTable>

      


          </div>
         
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
            
        
         
        </>
    )
}
