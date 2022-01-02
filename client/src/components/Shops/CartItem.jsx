import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeQty, deleteItemFromCart } from '../../actions';

function CartItem() {
    const dispatch = useDispatch()
    const[qty, setQty] = useState(product.qty);
    //const userId = Cookies.get('id')
    
    const handleDeleteItem = () => {
        dispatch(deleteItemFromCart((userId, product.idproduct ? product.idproduct : product.id)))
    }

    const handleChangeQty = (e) => {
        const { value } = e.target;
        if (value <= product.stock && value >= 1) {
            setQty(value);
            dispatch(changeQty(product, e.target.value, userId));
        };
    }
    return (
        <>
        <div>
            <img src={product.thumbnail} alt={product.name} />
        </div>
        
        </>
    )
}

export default CartItem
