import { getCategories, createCategory } from "../actions/index";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import s from '../assets/styles/CatForm.module.css';


export default function CatForm (){
    const dispatch = useDispatch();
    const categories = useSelector(state=> state.productsReducer.categories);
    const [category, setCategory] = useState({
        name: '',
    })
    const [error, setError] = useState({
        name: 'Introduzca un nombre para continuar',
    })
    
    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

    function handleSubmit(e){
        dispatch(createCategory(category))
        setCategory({
            name: '',
        })
        // alert('Category Created Succesfuly')
    }
    function handleChange(e){
        let errorinput='';
        if(e.target.name==='name'&& e.target.value &&!/[a-zA-Z0-9]/.test(e.target.value)){
            errorinput='Solo se admiten caracteres alfanúmericos'
        }else{
            setCategory({
                ...categories,
                name: e.target.value,
            })
        }
        if(!e.target.value){
            errorinput='Introduzca un nombre para continuar';
        }
        setError({
            ...error,
            name:errorinput
        })
    }

return(
<>
<div className={s.Background}>
    {/* <!-- AÑADIR COMPONENTE NAVBAR -->
    <!-- AÑADIR BOTON DESPLEGABLE PERFIL --> */}
    <form className={s.Container} >
        <div className={s.Title}> 
            <h2>Product Category Creation</h2>
        </div>

        <div className={s.InputSelect}>
            <div className={s.Input}>
                <input 
                    onChange={handleChange}
                    value={category.name}
                    name='name'
                    type="text"
                    placeholder="Add a New Category"
                />
                {error.name?<span>{error.name}</span>:null}
                <button 
                    type="submit"
                    onClick={handleSubmit}>
                        Add
                </button>

            </div><br></br>

           {/*  <div className={s.Select}>
                <select 
                        name="Abiable" 
                        placeholder="Abiable Categories" 
                        >
                    <option>Abiable Categories</option>
                    {categories.map((a)=>(
                        <option
                        key={a.idCategory}
                        value={a.idCategory}>
                            {a}
                        </option>
                    ))}
                </select>  
            </div><br></br>*/}
        </div>

        <Link to='/'>
            <button>Home Page</button>
        </Link>
        
    </form>
</div>
</>
)}