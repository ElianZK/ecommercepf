import React from 'react'
import s from '../assets/styles/ProductCard.module.css'
import { Link, useNavigate } from "react-router-dom"
import {formatMoney} from 'accounting'
import { useDispatch } from 'react-redux'
import { buyProduct } from '../actions'
function ProductCard({ id , name , price , image, data,add}) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <div className={s.card}> 
         <div className={s.container}> 
            <div className={s.imgcont}>
            <Link to={`/detail/${id}`}><img className={s.img} src={image} alt={`Imagen de ${name}`}/></Link>
            </div>
            <div className={s.actions}>
               <p className={s.price}>{`${formatMoney(price)}`}<span > ARS</span></p>
               <button className={`${s.btn} `} onClick={()=>{
                  console.log("voy a comprar el producto")

                  dispatch(buyProduct(id));
                  navigate("/checkout")
               }}>Comprar ahora</button>
               <button className={`${s.btn}`} onClick={()=>add(data)}>Agregar al carrito</button>
            </div>
            <div className={s.namecont}>
               <Link to={`/detail/${id}`}><p className={s.name}><strong>{name}</strong></p></Link>
            </div>
         </div>
      </div>
   )
}

export default ProductCard;