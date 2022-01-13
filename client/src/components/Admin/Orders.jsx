import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders,adminFilterOrdersByPrice,adminFilterOrdersByState, updateOrderDispatched } from "../../actions";
import { useNavigate } from 'react-router-dom';
import { formatMoney } from 'accounting';
import s from '../../assets/styles/Orders.module.css'


export default function OrdersPannel (){
    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orderadici);
    const navigate = useNavigate();
    const deliveryOptions = ["processing", "sent", "recieved"];
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

    const changeStatus= (e, idOrder)=>{
      dispatch(updateOrderDispatched(idOrder, e.target.value));
    }
    
    return (
        <div className={s.Container}>
            <div className={s.Filters}>
                <select onChange={handleFilterStatus}>
                    <option value="">Filter by Shipping Status:</option>
                    <option value="processing">Processing</option>
                    <option value="sent">Sent</option>
                    <option value="recived">Recived</option>
                </select>
                <select onChange={handleFilterPrice}>
                    <option value="">Filter by price:</option>
                    <option value="H-price">Lower price</option>
                    <option value="L-price">Higher price</option>
                </select>
            </div>
            <div className={s.OrdersContainer}>
                {orders? orders.map((e,i)=>{
                    return( 
                        <div key={i} className={s.Overview}>
                            <button className={s.Status}>{e.status}</button>
                            <h4>Date: {e.creationDate.split('T')[0]}</h4>
                            <ul className={s.OverDetail}>
                                <li key={"0"} className={s.Amount}>Total amount: {formatMoney(e.totalPrice)}</li>
                                <li key={"1"}>Name: {e.name}</li>
                                <li key={"2"}>Last Name: {e.lastname}</li>
                                <li key={"3"}>Country: {e.address.country}</li>
                                <li key={"4"} >City: {e.address.city}</li>
                                <li key={"5"} >Postal Code: {e.address.postalCode}</li>
                                <li key={"6"}> Shipping Status: 
                                  <select  onChange={event=>changeStatus(event, e.idOrder)}>
                                    <option key={4} value={e.dispatched}>{e.dispatched}</option>
                                    {deliveryOptions.map((delivOption, index)=>{
                                      if(delivOption!==e.dispatched){
                                        return(<option key={index} value={delivOption}>
                                        {delivOption}
                                        </option>)
                                      };
                                      return;
                                    })}
                                  </select>
                                </li>
                            </ul>
                        
                            <h3>Order Detail</h3>
                            <div className={s.DetailContainer}>
                                {e.products.map((p,j)=>{
                                    return(
                                        <div key={j} className={s.Detail}>
                                            <h3 className={s.DetailTitle} onClick={(e)=>navigate(`/detail/${p.idProduct}`)}>{p.name}</h3>
                                            <p className={s.DetailItems}>Price per unit: {formatMoney(p.price)}</p>
                                            <p className={s.DetailItems}>Units: {p.amount}</p>
                                            <p className={s.DetailItems}>Subtotal: {formatMoney(p.amount * p.price)}</p>
                                        </div>
                                )
                            })}
                            </div>
                        </div>
                    )
                }): <div>No hay ordenes realizadas.</div>}
               
            </div>

        </div>
    )
}