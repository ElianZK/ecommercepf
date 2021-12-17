import { getBrands, createBrands, removeBrands } from "../../actions/index";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import s from '../../assets/styles/BrandForm.module.css';
import s2 from '../../assets/styles/CategoryForm.module.css';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { editBrand } from "../../actions/index";

export default function BrandForm (){
    const dispatch = useDispatch();
    const brands = useSelector(state=> state.productsReducer.brands);
    const [brand, setBrand] = useState({
        name: '',
    })
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const [error, setError] = useState({
        name: 'Introduzca un nombre para continuar',
    })

    const columns = [
        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            selector: row => row.buttons,
            sortable: false,
        },
    ]

    let edBrand = (id)=>{
         Swal.fire({
            title: 'Ingrese el nuevo nombre de la marca',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
              return name;
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(editBrand(id,result.value))
                setEdit(true)
                Swal.fire({
                    title: `Se ha actualizado correctamente la Categoria`,
                    icon: 'success'
                })
            }
          }) /**/
    }

    let deleteCat = (id)=>{
        dispatch(removeBrands(id))
        setRemove(true)
        Swal.fire({
            title: `Se ha actualizado correctamente la Categoria`,
            icon: 'success'
        })
    }

    let tbrands=brands.map((a,i)=>{
        return {
            key: i,
            id: i+1,
            name: a.name,
            buttons: [
                <abbr title="Editar categoria" key={0}><button className={s2.btnEdit} onClick={()=>edBrand(a.idBrand)} ><FontAwesomeIcon icon={faEdit}/></button></abbr>,
                <abbr title="Eliminar categoria" key={1}><button className={s2.btnDel} onClick={()=>deleteCat(a.idBrand)}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr>
            ]}
    })

    
    
    useEffect(()=>{
        dispatch(getBrands())
        setEdit(false)
        setRemove(false)
    },[dispatch,brand, edit, remove])

    function handleSubmit(e){
        e.preventDefault()
        if(!brand.name){
            Swal.fire({
                title: 'Advertencia',
                icon:'info',
                text:'Introduzca un nombre para continuar'
            })
        }else{
            dispatch(createBrands(brand))
            
            Swal.fire({
                title: 'Registro exitoso',
                icon: 'success',
                text: `Se ha registrado correctamente la marca ${brand.name}`,
            })
            //alert('Brand Created Succesfuly')
            setBrand({
                name: '',
            })
        }
    }
    function handleChange(e){
        let errorinput='';
        if(e.target.name==='name'&& e.target.value &&!/[a-zA-Z]/.test(e.target.value)){
            errorinput='Solo se admiten letras'
        }else{
            setBrand({
                ...brand,
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

return(
<>
<div className={s.Container}>
    {/* <!-- AÑADIR COMPONENTE NAVBAR -->
    <!-- AÑADIR BOTON DESPLEGABLE PERFIL --> */}
    <form className={s.Form} >
        <div className={s.Title}> 
            <h2>Product Brand Creation</h2>
        </div>

        <div className={s.InputSelect}>
            <div className={s.formGroup}>
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
        
    </form>
    <DataTable
        columns={columns}
        data={tbrands} 
    />
</div>
</>
)}