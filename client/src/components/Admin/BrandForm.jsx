import { getBrands, createBrands, deleteBrand } from "../../actions/index";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import s from '../../assets/styles/BrandForm.module.css';
import Swal from 'sweetalert2';


export default function BrandForm (){
    const dispatch = useDispatch();
    const brands = useSelector(state=> state.productsReducer.brands);
    const [brand, setBrand] = useState({
        name: '',
    })
    const [error, setError] = useState({
        name: 'Introduzca un nombre para continuar',
    })
    
    useEffect(()=>{
        dispatch(getBrands())
    },[dispatch])

    function handleSubmit(e){
        e.preventDefault()
        if(!e.target.value){
            Swal.fire({
                Title: 'Advertencia',
                icon:'info',
                text:'Introduzca un nombre para continuar'
            })
        }else{
            dispatch(createBrands(brand))
            setBrand({
                name: '',
            })
            alert('Brand Created Succesfuly')
        }
    }
    function handleChange(e){
        let errorinput='';
        if(e.target.name==='name'&& e.target.value &&!/[a-zA-Z]/.test(e.target.value)){
            errorinput='Solo se admiten letras'
        }else{
            setBrand({
                ...brands,
                [e.target.name]: e.target.value,
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

    function handleDelete(e){
        // deleteBrand(e.target.value)
        e.preventDefault()
        alert(`Brand has been deleted`)
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
                    value={brand.name}
                    name='name'
                    type="text"
                    placeholder="Add a New Category"
                />

                {error.name?<span>{error.name}</span>:null}

                <button type="submit"onClick={handleSubmit}>
                    Add
                </button>

            </div><br></br>

        </div>

        <Link to='/'>
            <button>Home Page</button>
        </Link>


        <div className={s.SelectLink}>
            <ul value="Abiable">
                    {brands.map((b)=>(
                        <li key={b.idBrand}value={b.idBrand}>
                            {b.name.toUpperCase()}<button name={b.name} className={s.Delete} onClick={handleDelete}><span>x</span></button>
                        </li> 
                    ))}
            </ul> 
        </div><br></br>
        
    </form>
</div>
</>
)}