import React from 'react'
import s from '../assets/styles/ProductCard.module.css'
import { Link } from "react-router-dom"
import {formatMoney} from 'accounting'
import { useSelector } from 'react-redux'
function ProductCard({ id , name , price , image}) {
   const cart = useSelector((state) => state.cart)
   const {cartItems} = cart;
   

   return (
      <div className={s.card}> 
         <div className={s.container}> 
            <div className={s.imgcont}>
            <Link to={`/detail/${id}`}><img className={s.img} src={image} alt={`Imagen de ${name}`}/></Link>
            </div>
            <div className={s.actions}>
               <p className={s.price}>{`$${price} USD`}</p>
               <button className={`${s.btn} `}>Comprar ahora</button>
               <Link to="/cart"><button className={s.btn}>Agregar al Carrito
                     
                        </button></Link>
            </div>
            <div className={s.namecont}>
                  <Link to={`/detail/${id}`}><p className={s.name}><strong>{name}</strong></p></Link>
            </div>
         </div>
      </div>
   )
}

export default ProductCard
