import React from 'react';
import Styles from '../assets/styles/CardBuy.module.css'


export default function CardBuy(){
    return (
        <div className={Styles.cont1}>
            <h4 className={Styles.h4} >17 Diciembre</h4>
            <div className={Styles.cont2}>
                <img className={Styles.img} src='https://ar.celulares.com/fotos/nokia-6131-1238-g-alt.jpg' alt='none' />
                <div className={Styles.cont3}>
                    <h4 className={Styles.colorh4}>Entregado</h4>
                    <h4>Fecha de Entregado</h4>
                    <h6>Titulo del producto</h6>
                    <h6>Cantidad</h6>
                </div>
                
                <button className={Styles.btn}>Ver compra</button>
                <button className={Styles.btn}>Volver a comprar</button>
            </div>
            
        </div>
    )
}