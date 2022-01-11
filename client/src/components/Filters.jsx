import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import s from '../assets/styles/Filters.module.css'
import {
    getAllProducts,
    getCategories,
} from '../actions/index'


function Filters({handleChangeLimit, handleSortProducts, handleFilterByCategory, handleFilterByBrand}) {
     const dispatch = useDispatch();
     const allProducts = useSelector(state => state.productsReducer.allProducts.productsInfo);

     useEffect(() => {
         dispatch(getAllProducts({offset:0, limit:25, maxPrice: null, minPrice:null, brand: null}))
         dispatch(getCategories()) 
     }, [dispatch])

     /* function handleClick(e){
         e.preventDefault()
         dispatch(getAllProducts())
     } */
    
     
     return (
        
        <div className={s.container}>
            <select 
            name='limit'
            onChange={handleChangeLimit}>
                        <option value='15'>15 Products</option>
                        <option value="25">25 Products</option>
                        <option value="35">35 Products</option>
                        <option value="50">50 Products</option>
                </select>

            <select 
            name='category'
            onChange={handleFilterByCategory}>
                <option value=''>Filters By Categories</option>
                        <option value="smartPhone">SmathPhone</option>
                        <option value="smartWatch">SmartWatch</option>
                        <option value="television">Television</option>
                </select>
      
    </div>
  )
}

export default Filters
