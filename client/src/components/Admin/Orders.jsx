import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders,getOrderProducts } from "../../actions";
import { Link } from 'react-router-dom';
import { formatMoney } from 'accounting';
import s from '../../assets/styles/Orders.module.css'


export default function OrdersPannel (){
    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orders);
    const {idUser} = JSON.parse(localStorage.getItem("user")); 
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    const handleGetUserOrders =(e)=>{
        e.preventDefault()
        dispatch(getOrderProducts(idUser))
    }
    
    return (
        <div className={s.Container}>
            <div className={s.Filters}>
                <select>
                    <option>Filter by date</option>
                    <option value="ascDate">Ascendant date</option>
                    <option value="descDate">Descendant date</option>
                </select>
            </div>
            <div className={s.OrdersContainer}>
                {orders.map(e=>{
                    return( 
                       
                        <div className={s.Overview}>
                            <h3 className={s.Status}>{e.status.toUpperCase()}</h3>
                            <h4>Date: {e.creationDate.split('T')[0]}</h4>
                            <ul className={s.OverDetail}>
                                <li className={s.Amount}>Total amount: {formatMoney(e.totalPrice)}</li>
                                <li>Country: {e.address.country}</li>
                                <li>City: {e.address.city}</li>
                                <li>Postal Code: {e.address.postalCode}</li>
                            </ul>

                            <h3>Order Detail</h3>
                            <div className={s.DetailContainer}>
                                {e.products.map(p=>{
                                    return(
                                        <div className={s.Detail}>
                                            <h3 className={s.DetailTitle}><Link to={`/detail/${p.idProduct}`}>{p.name}</Link></h3>
                                            <p className={s.DetailItems}>Price per unit: {formatMoney(p.price)}</p>
                                            <p className={s.DetailItems}>Units: {p.details.amount}</p>
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