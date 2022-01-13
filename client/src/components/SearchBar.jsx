import React, {useState, useEffect,} from 'react';
import { useSelector } from 'react-redux';
import s from '../assets/styles/SearchBar.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import {AutoComplete} from '../actions/index'

import { getAllProducts} from '../actions/index.js'
import { Hint } from 'react-autocomplete-hint';
import { useDispatch } from 'react-redux';

export default function SearchBar({setFilters}){
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [auto,setAuto] = useState([])
  let navigate = useNavigate();
  const products = useSelector((state) =>state.productsReducer.allProducts.productsInfo) 
  function handleChange(e){
      setName(e.target.value);

      setAuto(products?.map(p=>p.name))
  }

  function handleSubmit(e){
    e.preventDefault()
    if(name){
      setFilters(oldState=>({
        ...oldState,
        search: name
      }))
      navigate(`/`);
    }else{
      Swal.fire({
          title: 'Error al realizar la busqueda',
          text: 'Debe ingresar un nombre, para poder realizar la búsqueda',
          icon: 'error',
          confirmButtonText: 'Cool'
      });
    };
    setName('');   
  }
    useEffect(() => {
      dispatch(getAllProducts())
    }, [])
  return(
    <>
    <form className={s.container}>
      {/* <input
        className={s.input}
        type='text'
        value={name}
        onChange={handleChange}
        list="browsers"
        placeholder='Product Name...'
      /> */}
      <Hint options={Array.isArray(products)?products.map(p=>p.name):[]}>
        <input
        className={s.input}
            value={name}
            onChange={handleChange} />
    </Hint>

      
      <button
        className={s.btn}
        type='submit'
        onClick={(e) => handleSubmit(e)}>
        Search
      </button>      
    </form>
    </>
  )
}