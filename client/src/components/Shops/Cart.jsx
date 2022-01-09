import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/Cart.module.css'
import {getProductsCartUser, changeAmount, deleteItemFromCart, clearCart} from '../../actions/index'
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatMoney } from 'accounting';





 function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const products = useSelector(state => state.ordenReducer.cart);
    const Users = useSelector(state => state.usersReducer.loginInfo.users)
    const {idUser} = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        dispatch(getProductsCartUser(idUser)); 
    }, [dispatch]); 

    const handleDeleteItem = (idproduct) => {
        //e.preventDefault()
        dispatch(deleteItemFromCart(idproduct, idUser))
        Swal.fire({
            icon: 'success',
            text: 'Producto eliminado correctamente!',
            showConfirmButton: false,
            timer: 3000
          })
    }

    const handlerChangeAmount = (product,idUser,e) => {
        e.preventDefault()
        const { value } = e.target;
        if (value <= product.stock && value >= 1) {
            let auxProducts=products.map(p=>{
                if(p.idProduct===product.idProduct){
                    return {
                        ...p,
                        amount:value
                    }
                }
                return p;
            })

            dispatch(changeAmount(auxProducts, idUser));
        };
    }


    function handleGoToCheckOut() {
        if (idUser && idUser.email?.length) {
           navigate('/checkout')
        } else {
            navigate('/register');
        }
    } 


    function handleClearCart(e){
        e.preventDefault()
        dispatch(clearCart(idUser))
    }


    // const totalIncludeDesc = () => {
    //     products.length && products.reduce((totalWithoutDesc, { price, qty }) => 
    //     totalWithoutDesc + (price * qty), 0);
    // }

//    const total = products.length && products.reduce((total, { price, qty, perc_desc }) => 
//     total + price * qty * (100 - perc_desc) / 100, 0);

    // const desc = () => {
    //     products.length && products.reduce((desc, { price, qty, perc_desc }) => 
    //     desc + perc_desc * price * qty / 100, 0);
    // }


   
    const columns=[
        {
            name: "Image",   
            grow: 0,
            sortable: true,
            cell: row => <img height="84px" width="56px" alt={row.name} src={row.image[0]} />
        },
        {
            name: "Name",
            cell: row  => <Link to={`/detail/${row.idProduct}`}>{row.name}</Link>,
            sortable: true
        },
    
        {
            name: "Price",
            selector:row => formatMoney(row.price),
            sortable: true
        },

        {
            name: "Quantity",
            selector: row => <input name="amount" type="number" min={1} max={row.stock} value={row.amount} onChange={(e)=>handlerChangeAmount(row,idUser,e)}></input>//row.amount,
            //sortable: true
        },

        {
            name:"Amount",
            selector:row => formatMoney(row.price * row.amount),
            sortable: true
        },

        {
            cell: row => {
            console.log("table data",row.idProduct)
            return <abbr title="Delete Item"><button className={s.btnDel} onClick={()=>handleDeleteItem(row.idProduct)}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr>},
            ignoreRowClick: true,
            allowFlow: true,
            button: true 
        },
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
                title ={<h1>My Shopping Cart</h1>} 
                columns = {columns}
                data = {products}
                pagination
                paginationComponentOptions = {optionPagination}
                actions
                > </DataTable>
            </div>
                <div>
                        <div className={s.amount}>
                           Total Amount: {formatMoney(products?.reduce((a, c) => a + c.price*c.amount,0))}
                            
                        </div>
                </div>
                  
                <div className={s.btn_container}>
                    <button className={s.btn}><Link to='/'><span>GO MORE SHOP</span></Link></button>
                {idUser? 
                    <button className={s.btn}><Link to='/checkout' onClick={handleGoToCheckOut}><span>GO TO CHECKOUT</span></Link></button>
                    : null}
                    <button className={s.btn} onClick={handleClearCart}>CLEAR ALL CART</button>  

                </div>                         
        </>
    )
}
export default Cart