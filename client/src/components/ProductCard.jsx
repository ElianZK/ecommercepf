import React from 'react'
import s from '../assets/styles/ProductCard.module.css'
import { Link, useNavigate } from "react-router-dom"
import {formatMoney} from 'accounting'
<<<<<<< HEAD
import { useSelector } from 'react-redux'
function ProductCard({ id , name , price , image}) {
   const cart = useSelector((state) => state.cart)
   const {cartItems} = cart;
   
=======
import { useDispatch } from 'react-redux'
import { buyProduct } from '../actions'
function ProductCard({ id , name , price , image, data,add}) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
>>>>>>> origin/develop-fran

   return (
      <div className={s.card}> 
         <div className={s.container}> 
            <div className={s.imgcont}>
            <Link to={`/detail/${id}`}><img className={s.img} src={image} alt={`Imagen de ${name}`}/></Link>
            </div>
            <div className={s.actions}>
<<<<<<< HEAD
               <p className={s.price}>{`$${price} USD`}</p>
               <button className={`${s.btn} `}>Comprar ahora</button>
               <Link to="/cart"><button className={s.btn}>Agregar al Carrito
                     
                        </button></Link>
=======
               <p className={s.price}>{`${formatMoney(price)}`}<span > ARS</span></p>
               <button className={`${s.btn} `} onClick={()=>{
                  console.log("voy a comprar el producto")

                  dispatch(buyProduct(id));
                  navigate("/checkout/one")
               }}>Comprar ahora</button>
               <button className={`${s.btn}`} onClick={()=>add(data)}>Agregar al carrito</button>
>>>>>>> origin/develop-fran
            </div>
            <div className={s.namecont}>
               <Link to={`/detail/${id}`}><p className={s.name}><strong>{name}</strong></p></Link>
            </div>
         </div>
      </div>
   )
}

export default ProductCard;