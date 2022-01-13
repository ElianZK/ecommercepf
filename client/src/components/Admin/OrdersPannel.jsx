import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders,getOrderProducts, updateOrderDispatched } from "../../actions";
import { Link } from 'react-router-dom';
import { formatMoney } from 'accounting';
import s from '../../assets/styles/Orders.module.css'


export default function OrdersPannel (){
    const dispatch = useDispatch()
    const orders =  useSelector(state => state.ordenReducer.orders);
    const {idUser} = JSON.parse(localStorage.getItem("user")); 
    const deliveryOptions = ["processing", "sent", "recieved"];
    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    const handleGetUserOrders =(e, idUser)=>{
        e.preventDefault()
        dispatch(getOrderProducts(idUser))
    }
    const changeStatus= (e, idOrder)=>{
      console.log("despachando");
      dispatch(updateOrderDispatched(idOrder, e.target.value));
    }
    const filterByStatus= (e, attribute)=>{
      dispatch({type:"SORT_ORDERS", payload:{attribute, value:e.target.value}})
    };
    
    return (
        <div className={s.Container}>
            <div className={s.Filters}>
                <select>
                    <option key={0} value="" >Filter by date</option>
                    <option key={1} value="ascDate">Newest First</option>
                    <option key={2} value="descDate">Oldest First</option>
                </select>
                <select>
                    <option key={0} onChange={e=>filterByStatus(e,"status")} value="" >Filter by Delivery Status</option>
                    <option key={1} value="processing">Processing</option>
                    <option key={2} value="sent">Sent</option>
                    <option key={2} value="recieved">Recieved</option>
                </select>
                <select>
                    <option key={0} onChange={e=>filterByStatus(e,"dispatched")} value="">Filter by Order Status</option>
                    <option key={1} value="processing">Processing</option>
                    <option key={2} value="rejected">Rejected</option>
                    <option key={2} value="completed">Completed</option>
                    <option key={2} value="canceled">Canceled</option>
                </select>
            </div>
            <div className={s.OrdersContainer}>
                {orders?orders.map(e=>{
                    return( 
                       
                        <div className={s.Overview}>
                            <h3 className={s.Status}>{e.status.toUpperCase()}</h3>
                            <h4>Date: {e.creationDate.split('T')[0]}</h4>
                            <ul className={s.OverDetail}>
                                <li key={"0"} className={s.Amount}>Total amount: {formatMoney(e.totalPrice)}</li>
                                <li key={"1"} >Country: {e.address.country}</li>
                                <li key={"2"}>City: {e.address.city}</li>
                                <li key={"3"}>Postal Code: {e.address.postalCode}</li>
                                <li key={"4"}> Delivery Status: 
                                  <select  onChange={event=>changeStatus(event, e.idOrder)}>
                                    <option key={4} value={e.dispatched}>{e.dispatched}</option>
                                    {deliveryOptions.map((delivOption, i)=>{
                                      if(delivOption!==e.dispatched){
                                        return(<option key={i} value={delivOption}>
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
                                {orders.products?.map(p=>{
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
                }): null}
               
            </div>

        </div>
    )
}