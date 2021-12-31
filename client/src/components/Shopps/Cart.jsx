import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCartUser, removeAllFromCart } from '../../actions';
import CartItem from './CartItem';
import TotalCart from './TotalCart';
import s from '../../assets/styles/Cart.module.css'

function Cart() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getProductsCartUser())
    }, [dispatch]);

    const handleRemoveAllFromCart= (e) =>{
        e.preventDefault();
        dispatch(removeAllFromCart())
    }

    const amountWhitDesc = products.length && products.reduce((amountWhitDesc, {price, quantity}) => amountWhitDesc + (price * quantity), 0);
    const total = products.length && products.reduce((total, {price, quantity, descuento}) => total + price * quantity * (100 - descuento)/100, 0);
    const desc = products.length && products.reduce((desc, { price, quantity, descuento}) => desc + descuento * price * quantity / 100, 0);


    return (

        <div className={s.card_container}>
            {products && products.length > 0 ? 
            <div className={s.cart_total_items}>
                <div className={s.cart_prods_10}>
                    {
                        products.map((product, index) => (
                            <CartItem product={product} key={product.id} index={index}  />
                        ))
                    }
                </div>
                    <button onClick={handleRemoveAllFromCart} className={s.remove_item_btn}>Empty Cart</button>
                    <h4>Amount: $ {amountWhitDesc}</h4>
                    {
                        desc > 0 ?
                        <h3>Descuento Total: - ${Math.floor(desc)}</h3>
                        : <h3>Descuento Total: 0</h3>
                    }
                </div>
                : <h3 className={s.no_items}>Cart is Empty</h3>
            }
            {products && products.length > 0 ?
            <div className={s.card_total_items}>
                <TotalCart total={Math.floor(total)} />
                {/* <div className='shipping_info_div'>
                    <InfoShipping />
                </div> */}
            </div>
            : null
            }  
        </div>
    );
}

export default Cart
