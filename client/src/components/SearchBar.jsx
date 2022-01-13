import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import s from '../assets/styles/SearchBar.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllProducts} from '../actions/index.js'
import { Hint } from 'react-autocomplete-hint';
import { useDispatch } from 'react-redux';

export default function SearchBar({setFilters}){
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [auto,setAuto] = useState([])
  let navigate = useNavigate();
  const products = useSelector((state) =>state.productsReducer.allProducts.productsInfo) 
  function handleChange(value){
      setName(value);

      setAuto(products?.map(p=>{
        return {label: p.name}}))
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
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Array.isArray(products)?products.map(p=>{
          return {label: p.name}}):[]}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {()=>{handleChange(newValue.label)}}}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      /> */}
      
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