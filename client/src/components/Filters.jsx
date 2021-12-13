import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import s from '../assets/styles/Filters.module.css'
import {
    getAllProducts,
    getCategories,
} from '../actions/index'


function Filters({handleChangeLimit, handleSortProducts, handleFilterByCategory, handleFilterByBrand}) {
     const dispatch = useDispatch();
     const allProducts = useSelector(state => state.productsReducer.allProducts);

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
      
            <select 
            name='brand'
            onChange={handleFilterByBrand}>
                <option value=''>Select Brand</option>
                <option value='zte'>Zte</option>
                <option value='samsung'>Samsung</option>
                <option value='motorola'>Motorola</option>
                <option value='cat'>Cat</option>
                <option value='nokia'>Nokia</option>
                <option value='lg'>Lg</option>
                <option value='Kodak'>Kodak</option>
                <option value='ipro'>Ipro</option>
                <option value='energizer'>Energizer</option>
                <option value='quantum'>Quantum</option>
                <option value='philco'>Alcatel</option>
                <option value='panacom'>Panacom</option>
                <option value='tcl'>Tcl</option>
                <option value='positivo'>Positivo</option>
                <option value='ulefone'>Ulefone</option>
                <option value='xiaomi'>Xaiaomi</option>
                <option value='sansei'>Sansei</option>
                <option value='sky devices'>Sky Devices</option>
                <option value='apple'>Apple</option>
                <option value='excess'>Excess</option>
                <option value='blue'>Blu</option>
                <option value='roadstar'>Roadstar</option>
                <option value='rca'>Rca</option>
                <option value='blackview'>Blackview</option>
                <option value='ipro - blu - exc segun stock'>Ipro - blu - exc segun stock</option>
                <option value='noblex'>Noblex</option>
                <option value='blu - ipro - nokia - generico'>Blu - ipro - nokia - generico</option>
                <option value='luo'>Luo</option>
                <option value='microsoft'>Microsoft</option>
                <option value='imilab'>Imilab</option>
                <option value='microwear'>Microwear</option>
                <option value='amazfit'>Amazfit</option>
                <option value='Nictom'>Nictom</option>
                <option value='colmi'>Colmi</option>
                <option value='ruffo'>Ruffo</option>
                <option value='y9'>Y9</option>
                <option value='huawei'>Huawei</option>
                <option value='noga'>Noga</option>
                <option value='you'>You</option>
                <option value='skmei'>Skemi</option>
                <option value='tedge'>Tedge</option>
                <option value='gadnic'>Gadnic</option>
                <option value='dt no.1'>Dt no.1</option>
            </select>
            {/* <select 
                name='brand'
                onChange={handleFilterByBrand}>
                    <option value=''>Select Brand</option>
                   {/*  {allProducts?allProducts.map((p) => {
                        return(
                        <option key={p.idProduct} value={p.idProduct}>{p.brand}</option>
                    )}) :('Brand is not Found')} 
            </select> */}
            <select
                name='Sorts'
                onChange={handleSortProducts}>
                <option value=''>Sorts</option>
                <option value='A-Z'>Brands A-Z</option>
                <option value='Z-A'>Brands Z-A</option>
                <option value='Lower_price'>Lower Price</option>
                <option value='Highest_price'>Highest_price</option>
            </select>

            
        </div>
    )
}

export default Filters
