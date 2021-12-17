import React from 'react'
import s from '../assets/styles/ProductCard.module.css'
import { Link } from "react-router-dom"
import {formatMoney} from 'accounting'
function ProductCard({ id , name , price , image}) {
   return (
      <div className={s.card}> 
         <div className={s.container}> 
            <div className={s.imgcont}>
            <Link to={`/detail/${id}`}><img className={s.img} src={image} alt={`Imagen de ${name}`}/></Link>
            </div>
            <div className={s.actions}>
               <p className={s.price}>{`${formatMoney(price)}`}<span > ARS</span></p>
               <button className={`${s.btn} `}>Comprar ahora</button>
               <button className={`${s.btn}`}>Agregar al carrito</button>
            </div>
            <div className={s.namecont}>
                  <Link to={`/detail/${id}`}><p className={s.name}><strong>{name}</strong></p></Link>
            </div>
         </div>
      </div>
   )
}

export default ProductCard
