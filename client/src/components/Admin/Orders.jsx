import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders,adminFilterOrdersByPrice,adminFilterOrdersByState,updateOrderStatus } from "../../actions";
import { Link } from 'react-router-dom';
import { formatMoney } from 'accounting';
import s from '../../assets/styles/Orders.module.css'


export default function OrdersPannel (){
    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orderadici);
    console.log("------",orders)
    useEffect(() => {
        dispatch(getAllOrders())
    },[dispatch]);


    function handleFilterStatus(e){
        e.preventDefault()
        // dispatch(getAllOrders())
        dispatch(adminFilterOrdersByState(e.target.value))
    }

    function handleFilterPrice (e){
        e.preventDefault()
        dispatch(adminFilterOrdersByPrice(e.target.value))
    }

    function handleChangeStatus (e){

    }
    
    return (
        <div className={s.Container}>
            <div className={s.Filters}>
                <select onChange={handleFilterStatus}>
                    <option value="">Filter by send status</option>
                    <option value="processing">processing</option>
                    <option value="sent">sent</option>
                    <option value="recived">recived</option>
                </select>
                <select onChange={handleFilterPrice}>
                    <option value="">Filter by price</option>
                    <option value="H-price">Descendant price</option>
                    <option value="L-price">Ascendant price</option>
                </select>
            </div>
            <div className={s.OrdersContainer}>
                {orders?.map((e,i)=>{
                    return( 
                        <div key={i} className={s.Overview}>
                            <button className={s.Status}>{e.dispatched}</button>
                            <h4>Date: {e.creationDate.split('T')[0]}</h4>
                            <ul className={s.OverDetail}>
                                <li className={s.Amount}>Total amount: {formatMoney(e.totalPrice)}</li>
                                {console.log("TOTALPRICE",e.totalPrice)}
                                <li>Name: {e.user.name}</li>
                                <li>Last Name: {e.user.lastname}</li>
                                <li>Country: {e.address.country}</li>
                                <li>City: {e.address.city}</li>
                                <li>Postal Code: {e.address.postalCode}</li>
                            </ul>
                        
                            <h3>Order Detail</h3>
                            <div className={s.DetailContainer}>
                                {e.products.map((p,j)=>{
                                    return(
                                        <div key={j} className={s.Detail}>
                                            <h3 className={s.DetailTitle}><Link to={`/detail/${p.idProduct}`}>{p.name}</Link></h3>
                                            <p className={s.DetailItems}>Price per unit: {formatMoney(p.price)}</p>
                                            <p className={s.DetailItems}>Units: {p.details.amount}</p>
                                            <p className={s.DetailItems}>Subtotal: {formatMoney(p.details.amount * p.price)}</p>
                                        </div>
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
               
            </div>

        </div>
    )
}