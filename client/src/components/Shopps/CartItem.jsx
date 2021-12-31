import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { changeQuantity, removeItemFromCart } from '../../actions';
import s from '../../assets/styles/CartItem.module.css'


function CartItem({product}) {
    const dispatch = useDispatch();
    // const cartCss = (index) => {

    //     let count = index % 3;
    //     switch(count){
    //         case 0:
    //             return "card_container_one";
    //         case 1:
    //             return "card_container_two";
    //         case 2:
    //             return "card_container_three";
    //         default:
    //             return "card_container_one";
    //     }
    // };
    
    const [quantity, setQuantity] = useState(product.quantity);
    const handleRemoveItemFromCart = () => {
        dispatch(removeItemFromCart(product.id))
    }

    const handleChangeQuantity =(e) => {
        const {value} = e.target;
        if(value <= product.stock && value >= 1) {
            setQuantity(value);
            dispatch(changeQuantity(product, value));
        }
    }
    return (
        <div >
            <div>
                <img className={s.cart_img} src={product.image} alt={product.name}></img>
                <div className={s.cart_info}>
                    <h2>{product.name}</h2>
                    <div className={s.cart_info_btn}>
                        <input 
                            type="number"
                            onChange={handleChangeQuantity}
                            value={quantity}>
                        </input>
                        <div>
                            <h3>Precio unitario: {`$ ${product.price}`}</h3>
                            {product.descuento > 0 ?
                            <div>
                                <h3>Descuento: {product.descuento}%</h3>
                                <h3>Descuento unitario: {`$ ${Math.floor(product.descuento * product.price/100)}`}</h3>
                                </div>
                                : <div>
                                    <h3>Descuento: --</h3>
                                    <h3>descuento unitario: --</h3>
                            </div>}
                        </div>
                    </div>
                </div>
                <button onClick={handleRemoveItemFromCart} className={s.remove_item_btn}>X</button>
            </div>
        </div>
    )
}

export default CartItem

