import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {info} from './info';
import s from '../../assets/styles/BuyHistory.module.css'
import {getOrderProducts} from '../../actions/index'
import { formatMoney } from 'accounting';

 
export default function BuyHistory() {

    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orders)
    const User = useSelector(state => state.usersReducer.loginInfo.user)
    const {idUser} = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        dispatch(getOrderProducts(idUser))
    }, [])
    return (
        <div className={s.container}>
        
            <div className={s.background}>

            <h2 className={s.title}>SHOPPING HISTORY</h2>

                {orders?.map((e)=>{return(
                    <div className={s.card} >

                        <div className={s.headerContainer}>
                            <h2 className={s.cardDate}>Date: {e.creationDate.substr(0,10)}</h2>
                            <h2 className={s.detailTitle}>Buy Detail</h2>
                        </div>

                         <div className={s.cardContainer}>

                            <ul className={s.stateAmount}>
                                <li className={e.status=='completed'?`${s.status}`:`${s.statusfail}`}>{e.status.toUpperCase()}</li>
                                <li className={s.amount}>
                                    Total: {formatMoney(e.totalPrice*10)}
                                </li>
                            </ul>

                           <div className={s.detail}>  
                                <ul className={s.detailContainer}>
                                 {e.products.map(p=>{
                                    return(
                                        <>                                      
                                            <li className={s.productName}><p>{p.name}</p> <Link className={s.btnDetail} to={`/detail/${p.idProduct}`}>Ver detalles</Link></li>
                                            {/* <li className={s.productQty}>Units: {p.qty}</li> */}
                                            {/* <li className={s.productPrice}>Price: {formatMoney(p.price)}</li> */}
                                            {/* <li className={s.subtotal}>Subtotal: {formatMoney(p.price*p.qty)} </li> */}
                                        </>  
                                    )
                                })}{/**/}
                                </ul>
                            </div>

                        </div> 

                    </div>
                )})}

            </div>

        </div>
    )
}
