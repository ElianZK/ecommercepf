import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import {CardElement, Elements, useElements, useStripe,} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { setOrderProducts, clearCart } from '../../actions';
import s from '../../assets/styles/Checkout.module.css'
import { formatMoney } from 'accounting';


const stripePromise = loadStripe('pk_test_51KE0nYFfD78XPAGcGPPH7JVRgUrvShCe00gJQTJ8do8OhF6s205GYs2OrB7qBEdQVhQj3Xh0YtjqE6pAuBQSyomS00FxVwsPvF')

function Validate(input) {
    let errors = {};


    if(!input.name){
        errors.name = 'name is required';
    }else if(!/^\w{3,20}$/.test(input.name)){
        errors.name = 'Invalid name'
    }else if(!input.lastName){
        errors.lastName = 'lastName es required'
    }else if(!/^[a-zA-ZA\s]{3,20}$/.test(input.lastName)){
        errors.lastName = 'Invalid lastName'
    }else if(!input.address){
        errors.address = 'address is required';
    }
    else if(!input.email){
        errors.email = 'email is required'
    } else if(!input.email){
        errors.email = 'Invalid email'
    }
    return errors;
}

export default function Checkout(){
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const User = JSON.parse(localStorage.getItem("user"));
        const idUser = !User?null:User.idUser;
        const cart = useSelector((state)=>state.ordenReducer.cart)

        //const token=localStorage.getItem('token')
        
        const [state,setState]= useState({
            name: User.name,
            phone: User.phone,
            country:'',
            city:'',
            email: User.email,
            address: {
                street:'',
                postalCode:'',
            }
        
        })
        


        let totalPrice= 0 
        let iva = 0  
        let buys=[]
        for (const i in cart) {
            buys.push({
                idProduct: cart[i].idProduct,
                name:cart[i].name,
                image: cart[i].image, 
                price: Number(cart[i].price),
                amount: Number(cart[i].amount),
            })
            totalPrice += (cart[i].price*cart[i].amount)
            //iva = (totalPrice*0.21)
            // console.log("comp",buys)
            // console.log("iva",iva)
        }
        
       
        function handleChange(e){
            setState({
                ...state,
                [e.target.name]:e.target.value
            });
        };
        
        const Payment = () => {
            const stripe = useStripe();
            const elements = useElements();

            const handleSubmit = async(e) => {
            e.preventDefault();
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type:"card",
                card: elements.getElement(CardElement)
            })
                    if(!error) {
                        const {id} = paymentMethod;
                        let pay = {
                            productsInfo: buys,
                            email: state.email,
                            //country: state.country,
                            //phone: state.phone,
                            address: {
                                country: state.country,
                                postalCode: state.postalCode,
                                city: state.city,
                                street:state.street
                            },
                            totalPrice: Math.round(totalPrice),
                            id: id
                        }
                dispatch(setOrderProducts(pay, User.idUser)) //aca deberia ir la ruta post
                    Swal.fire({
                        icon: 'success',
                        text: "Thank you for your purchase , you will receive an email with the details",
                        showConfirmButton: true,
                     }).then((result)=>{
                        if(result.value){
                           //navigate('/buyHistory') //q vaya a ordenes
                           window.location='/buyHistory'
                        }
                     });
                dispatch(clearCart(User.idUser))
                
                } else {
                    console.log(error); 
                }
        }
            return <form className= {s.form_compra}  
                            onSubmit={handleSubmit}>
                        <CardElement className={s.card}/>     
                        {state.email && state.address &&
                        <button className={s.btn}>
                                Buy
                            </button>}
                    </form>       
        }

        
        return(   
    
    <div className={s.container}>
            <h1 className={s.title}>Order Summary</h1>
        <div className={s.container_pasarela}>
            <div className={s.pasarela_card}>
            {cart?.map(e=>{       /*aca va token*/ 
                return (<div key={e.idProduct} className={s.pasarela_cdtm}>
                        <div>
                        <img className={s.image_pasarela} alt="imagen_pasarela"src={e.image}></img>
                        </div>
                        <div className={s.pasarela_info}>
                        <div><p className={s.titulo_pasarela}>{e.name}</p></div>
                        
                        
                        <div><p className={s.unidades_pasarela}>Unidades: {e.amount}</p></div>
                       <div><p className={s.precio_pasarela}><span className={s.peso_pasarela}></span> {formatMoney(e.price)}</p></div>
                        </div>
                    </div>)
                    
            })}
            </div>
            <div className={s.datos_pasarela}>

                <p className={s.neto_pasarela}>Sub-Total: <span className={s.subtotal_pasarela}> {formatMoney(totalPrice.toFixed(2))} </span> </p>
                <p className={s.neto_pasarela}>iva: <span className={s.subtotal_pasarela}> {formatMoney((totalPrice* 0.21).toFixed(2))}</span> </p>
                <p className='total_pasarela'> Total Amount:<span className="total_numero_pasarela">{formatMoney(Math.round(totalPrice + iva ))}</span></p>
            </div>
        </div>
            { buys?(<div className={s.contenedor_facturacion}>
                <p className={s.facturacion_pasarela}>Facturación</p>     
                <p className={s.direccion_pasarela}>Dirección de envío</p>
                <div className={s.datos_personales_pasarela}>
                <div>
                    <label>Name</label>  
                    <input 
                        type='text'
                        required 
                        autoComplete='name' 
                        name='name' 
                        value={state.name} 
                        onChange={(e)=>handleChange(e)} />    
                    </div>
                    <div>
                    <label>Phone</label>  
                    <input 
                        type='text' 
                        required 
                        autoComplete='phone' 
                        name='phone' 
                        value={state.phone} 
                        onChange={(e)=>handleChange(e)} />    
                    </div>
                    <div>
                    <label>Email</label>  
                    <input 
                        type='text' 
                        required 
                        autoComplete='email' 
                        name='email' 
                        value={state.email} 
                        onChange={(e)=>handleChange(e)} />    
                    </div>
                    

                    <div>
                    <label>Country</label>  
                    <input 
                        type='text' 
                        required 
                        autoComplete='country-name' 
                        name='country' 
                        value={state.country} 
                        onChange={(e)=>handleChange(e)} />    
                    </div>
                    <div>
                    <label>City</label> 
                    <input 
                        type='text' 
                        required 
                        autoComplete='city' 
                        name='city' 
                        value={state.city} 
                        onChange={(e)=>handleChange(e)}/>    
                    </div>
                    <div>
                    <label>Street</label>  
                    <input 
                        type='text' 
                        required 
                        autoComplete='street-address' 
                        name='address' 
                        value={state.address.street} 
                        onChange={(e)=>handleChange(e)} />     
                    </div>
                    <div>
                    <label>Postal Code</label>  
                    <input 
                        type='number' 
                        required 
                        autoComplete='postal-code' 
                        name='postalCode' 
                        value={state.address.postalCode} 
                        onChange={(e)=>handleChange(e)}/>    
                    </div>
               </div>
                <div>
                    <Elements stripe={stripePromise}>
                        <Payment/>
                    </Elements>                      
                </div>
            </div>): (<div>
                <p>To continue with the purchase you must LOG IN </p>

            </div>)}

        </div>
    
    
    )
}


