import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import s from '../../assets/styles/BuyHistory.module.css'
import {getOrderProducts} from '../../actions/index'
import { formatMoney } from 'accounting';
import { getProductsCartUser,getProductId } from '../../actions';

 



export default function BuyHistory() {

    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orders)
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;
    
    // guardo en el locaStorage mi orders y lo convierto en string
    localStorage.setItem('byhistory',JSON.stringify(orders))

    useEffect(() => {
        dispatch(getOrderProducts(idUser))
    }, [])
    return (
        <div className={s.container}>
        
            <div className={s.background}>

            <h2 className={s.title}>SHOPPING HISTORY</h2>

                {orders?.map((e, index)=>{return(
                    <div className={s.card} key={e.index}>

                        <div className={s.headerContainer}>
                            <h2 className={s.cardDate}>Date: {e.creationDate.substr(0,10)}</h2>
                            <h2 className={s.detailTitle}>Buy Detail</h2>
                        </div>

                         <div className={s.cardContainer}>

                            <ul className={s.stateAmount}>
                                <li className={e.status=='completed'?`${s.status}`:`${s.statusfail}`}>{e.status.toUpperCase()}</li>
                                <li className={s.amount}>
                                    Total: {formatMoney(e.totalPrice)}
                                </li>
                            </ul>

                           <div className={s.detail}>  
                                <ul className={s.detailContainer}>
                                 {e.products.map(p=>{
                                    return(
                                        <>                                      
                                            <li className={s.productName}><p>{p.name}</p> <Link className={s.btnDetail} to={`/detail/${p.idProduct}`}>Ver detalles</Link></li>
                                            <li className={s.productQty}><strong>Quantity: </strong>{p.amount}</li>
                                            <li className={s.productPrice}>Price: {formatMoney(p.price)}</li>
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
