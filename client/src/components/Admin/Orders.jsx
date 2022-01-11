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
                        <ul className={s.Overview}>
                            
                            <h3 className={s.Status}>{e.status.toUpperCase()}</h3>
                            <li>Date: {e.creationDate.split('T')[0]}</li>

                            <ul className={s.OverDetail}>
                                <li>Country: {e.address.country}</li>
                                <li>City: {e.address.city}</li>
                                <li>Postal Code: {e.address.postalCode}</li>
                                <li>Total amount: {formatMoney(e.totalPrice)}</li>
                            </ul>

                            <button>Id:{e.idOrder}</button>

                        </ul>
                    )
                }
                )} 
                <div className={s.OrderDetail}>
                    {orders?.map(o=>
                        o.products.map(p=>{
                            return(
                                <ul>
                                    <h3>{p.name}</h3>
                                    <li>{p.price}</li>
                                </ul>
                            )
                        })
                    )}
                </div>
            </div>


        </div>
    )
}