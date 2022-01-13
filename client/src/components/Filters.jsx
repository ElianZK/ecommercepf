import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from '../assets/styles/Filters.module.css';
import { getBrands} from '../actions/index';


//| function Filters({handleChangeLimit, handleSortProducts, handleFilterByCategory, handleFilterByBrand}) {
function Filters({setFilters, setPage, Pagination, handleChange,nButtons, page}){
  const dispatch = useDispatch();
  const brands = useSelector(state=>state.productsReducer.brands);
  const categories = useSelector(state=>state.productsReducer.categories);
  const [categoryBrands, setCategoryBrands] =useState('');
  const [priceLimits, setPriceLimits] = useState({
    minPrice:0,
    maxPrice:1
  })


  //Use Effect para obtener las marcas que pertenecen a la categoría filtrada
  useEffect(() => {
    dispatch(getBrands(categoryBrands)); 
  }, [dispatch, categoryBrands])


  const handleChangeFilters = (event)=>{
    event.preventDefault();
    setFilters(oldState=>({
      ...oldState,
      [event.target.name]:event.target.value
    }))
    setPage(1);
  }

  const handleChangeCategory = (event)=>{
    event.preventDefault();
    setCategoryBrands(event.target.value);
    handleChangeFilters(event);
    setFilters(oldState=>({
      ...oldState,
      brand: ""
    }));
    setPage(1);
  }

  const handlePriceSet = (event)=>{
    setPriceLimits(oldState=>({
      ...oldState,
      [event.target.name]:event.target.value
     }))
     setFilters(oldState=>({
      ...oldState,
      ...priceLimits
    }));
    setPage(1);
  }

  return (
    <div className={s.container}>
      <div>
        <select name='limit' onChange={handleChangeFilters}>
          <option value='15'>15 Products</option>
          <option value="25">25 Products</option>
          <option value="35">35 Products</option>
          <option value="50">50 Products</option>
        </select>

        <select name='category' onChange={handleChangeCategory}>
          <option value=''>Select Category</option>
          {categories.map(el=>(<option key={el.idCategory} value={el.name}>{el.name}</option>))}
        </select>

        <select name='brand' onChange={handleChangeFilters}>
          <option value=''>Select Brand</option>
          {brands.map(el=>(<option key={el.idBrand} value={el.name}>{el.name}</option>))}
        </select>

          <input type="number" name="minPrice" min={0} onChange={handlePriceSet} placeholder="MinPrice"/>
          <input type="number" name="maxPrice" min={0} onChange={handlePriceSet} placeholder='MaxPrice'/>

        <select name='sort' onChange={handleChangeFilters}>
          <option value=''>Sorts</option>
          <option value='Desc_name'>Descendent name</option>
          <option value='Asc_name'>Ascendent name</option>
          <option value='Lower_price'>Lower Price</option>
          <option value='Highest_price'>Highest price</option>
        </select>
      </div>

      <div className={s.pagination}>
        <Pagination page={page}  handleChange={handleChange} nButtons={nButtons}/>
      </div>
    </div>
  )
}

export default Filters
