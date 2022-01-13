import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/WishList.module.css'
import {getWishList,deleteItemFromWishList} from '../../actions/index'
import Swal from 'sweetalert2';
import { Link, useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatMoney } from 'accounting';

 function WishList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const wishList = useSelector(state => state.productsReducer.wishList);
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;

    useEffect(() => {
        dispatch(getWishList(idUser)); 
    }, [dispatch]); 

    const handleDeleteItem = (idproduct) => {
        //e.preventDefault()
        dispatch(deleteItemFromWishList(idUser, idproduct ))
        Swal.fire({
            icon: 'success',
            text: 'Producto eliminado correctamente!',
            showConfirmButton: false,
            timer: 3000
          })
    }

    // idProduct name price stock thumbnail

    const columns=[
        {
            name: "Image",   
            grow: 0,
            sortable: true,
            cell: row => <img height="84px"  alt={row.name} src={row.thumbnail} />
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
          name: "Stock",
          selector:row => row.stock,
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
        selectAllRowsItemText: "All",
        responsive: true
    } 

     return (
         <>
            <div className={s.container}>
            <DataTable 
                className={s.table}
                title ={<h1 className={s.Title}>My Wish List</h1>} 
                columns = {columns}
                data = {wishList}
                pagination
                paginationComponentOptions = {optionPagination}
                actions
                > </DataTable>
            </div>                         
        </>
    )
}
export default WishList