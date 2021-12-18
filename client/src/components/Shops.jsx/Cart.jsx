import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from '../../assets/styles/Cart.module.css'
import {addToCart,removeOneFromCart, removeAllFromCart,clearCart} from '../../actions/index'
import Swal from 'sweetalert2';



export default function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const product = useSelector((state) => state.products)

    const cartList=[]
    let totalPrice = 0;  
    for (const i in cart) {
        cartList.push(cart[i]);
        totalPrice += cart[i].precio*cart[i].count   
    }

    return (
    //     <div >
    //         <h2>Shopping Cart</h2>
    //         <h3>Products</h3>
    //         <article className={s.box}></article>
    //         {cartList.length > 0 ? (<div>    
    //             {products.map(p=>{
    //             return (<ProductCard key={p.id} >
    //                    <div>
    //                    <p id={p.id}>x{p.count}</p>
    //                    <div>
    //                     <p>{e.name}</p>
    //                     <p>{e.thumbnail}</p></div>
    //                     <div>
    //                     <p><span>$</span>{e.price}</p>  
    //                     </div>
    //                    </div>
    //                   <button  onClick={()=> dispatch(removeAllFromCart(e.id, e.count))}/>
    //                     <div>
    //                         {e.count < e.stock ? <button onClick={ () => dispatch(addToCart(e.id)) }/> : null }
    //                        <button  onClick={()=> dispatch(removeOneFromCart(e.id,e.count))}/>
    //                     </div>    
                                    
    //                 {/* </div>) */}
    //             })
    //             } 
    //         </div>) : (<div><p>Your Cart is Empty</p></div>)
    //         }    

    //           {
    //             cartList.length !== 0 ? (
    //             <div> 
    //                 <p><span>Total:</span> <span>$</span>{totalPrice.toFixed(2)} </p> <hr/>
    //                 <div >
    //                     <NavLink to='/checkout'><span>Confirm Your Purchase</span></NavLink>
    //                 </div>   
    //                 <button onClick={()=> dispatch(clearCart(cartList))}>Clean Cart</button>
    //             </div>) : null
    //         }
    //     </div>
    <div></div>
    )
}
