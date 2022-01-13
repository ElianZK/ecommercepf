import React, {useState} from 'react';
import s from '../assets/styles/SearchBar.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({setFilters}){
  const [name, setName] = useState('');
  let navigate = useNavigate();

  function handleChange(e){
      setName(e.target.value);
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

  return(
    <>
    <form className={s.container}>
      <input
        className={s.input}
        type='text'
        value={name}
        onChange={handleChange}
        placeholder='Product Name...'
      />
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