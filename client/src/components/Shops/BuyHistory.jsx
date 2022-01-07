import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {info} from './info';
import s from '../../assets/styles/BuyHistory.module.css'
import { formatMoney } from 'accounting';

 
export default function BuyHistory() {

    const dispatch = useDispatch()
    const orders = info

    return (
        <div className={s.container}>
        
            <div className={s.background}>

            <h2 className={s.title}>Historial de compras</h2>

                {orders.map((e)=>{return(
                    <div className={s.card}>

                        <div className={s.headerContainer}>
                            <h2 className={s.cardDate}>Date: {e.date}</h2>
                            <h2 className={s.detailTitle}>Buy Detail</h2>
                        </div>

                        <div className={s.cardContainer}>

                            <ul className={s.stateAmount}>
                                <li className={s.status}>{e.status[3].toUpperCase()}</li>
                                <li className={s.amount}>
                                    Total: {formatMoney(e.amount)}
                                </li>
                            </ul>

                            <div className={s.detail}>  
                                {e.cart.map(p=>{
                                    return(
                                        <ul className={s.detailContainer}>
                                            <li className={s.productName}>{p.name}</li>
                                            <li className={s.productQty}>Units: {p.qty}</li>
                                            <li className={s.productPrice}>Price: {formatMoney(p.price)}</li>
                                            <li className={s.subtotal}>Subtotal: {formatMoney(p.price*p.qty)} </li>
                                        </ul>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                )})}

            </div>

        </div>
    )
}
