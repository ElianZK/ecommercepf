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

  