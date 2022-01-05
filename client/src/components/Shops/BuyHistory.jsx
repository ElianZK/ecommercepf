import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {info} from './info';
import s from '../../assets/styles/BuyHistory.module.css'


 function BuyHistory() {

    const dispatch = useDispatch()
    const orders = info

    const handleBuy = (e)=>{
        /* 
        componente que te envia a hacer el 
        chechout de un compra ya realizada,
        utilizando el id de la compra con su 
        respectivo detalle
        */ 
       alert('Compra Realizada')
    }



    let randomState =()=>{
        let peek = Math.random(0,4)
        return Math.trunc(peek)
    }


    return (
    <div className={s.container}>
        <div className={s.background}>

            <h2 className={s.title}>Historial de compras</h2>

            {orders.map((e)=>{return(
                <div className={s.card}>

                    <h2 className={s.cardHeader}>{e.date}</h2>

                    <div className={s.cardContainer}>

                        <ul className={s.stateAmount}>
                            <li className={s.status}>{e.status[0]}</li>
                            <li className={s.amount}>
                                Monto: ${e.cart.map(e=>{
                                    let t = 0;
                                    let a = parseInt(e.price,10)
                                    let b = parseInt(e.qty,10)
                                    t=(t+(a*b))
                                    return t
                                })}
                            </li>
                        </ul>

                        <div className={s.buttons}>
                            <Link to="/buyDetail"><button value={e.idOrder}>Detalle de compra</button></Link>
                            <button
                            onClick={handleBuy}
                            >Volver a comprar</button>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    </div>
    )
}

export default BuyHistory