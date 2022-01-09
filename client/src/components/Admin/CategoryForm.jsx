import { getCategories, createCategory, removeCategory, editCategory } from "../../actions/index";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import s from '../../assets/styles/CategoryForm.module.css';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

export default function CatForm (){
    const [isAdmin, setIsAdmin] = useState(false);

    const idUser = useSelector(state => state.usersReducer.loginInfo.user.idUser);

    useEffect(() => {
        axios.get("http://localhost:3001/user/type/" + idUser)
        .then(res => {
            let { access } = res.data;
    
            setIsAdmin(access && !!idUser)
        })
    }, [idUser]);

    useEffect(() => {
        console.log(isAdmin);
    }, [isAdmin])

    const dispatch = useDispatch();
    const categories = useSelector(state=> state.productsReducer.categories);
    const [category, setCategory] = useState({
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
            selector: row => row.namecat,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            selector: row => row.buttons,
            sortable: false,
        },
    ]
    
    const editCat = (id)=>{
        Swal.fire({
            title: 'Ingrese el nuevo nombre de categoria',
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
                dispatch(editCategory(id,result.value))
                setEdit(true)
                Swal.fire({
                    title: `Se ha actualizado correctamente la Categoria`,
                    icon: 'success'
                })
            }
          })
    }

    let deleteCat = (id)=>{
        dispatch(removeCategory(id))
        setRemove(true)
        Swal.fire({
            title: `Se ha actualizado correctamente la Categoria`,
            icon: 'success'
        })
    }

    let tcategorys=categories.map((a,i)=>{
        return {
            key: i,
            id: i+1,
            namecat: a.name,
            buttons: [
                <abbr title="Editar categoria" key={0}><button className={s.btnEdit} onClick={()=>editCat(a.idCategory)} ><FontAwesomeIcon icon={faEdit}/></button></abbr>,
                <abbr title="Eliminar categoria" key={1}><button className={s.btnDel} onClick={()=>deleteCat(a.idCategory)}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr>
            ]}
    })
    
    useEffect(()=>{
        dispatch(getCategories())
        setEdit(false)
        setRemove(false)
    },[dispatch,category, edit, remove])

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createCategory(category))
        Swal.fire({
            title: 'Categoria agregada',
            text: `La categoria ${category.name} ha sido registrada correctamente.`,
            icon: 'success'
        })
        setCategory({
            name: '',
        })
        
    }
    function handleChange(e){
        let errorinput='';
        if(e.target.name==='name' && e.target.value &&!/[a-zA-Z0-9]/.test(e.target.value)){
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

    return (
        <>
            <div className={s.Container}>
                {isAdmin ? (<>
                    <form className={s.Form} >
                        <div className={s.Title}> 
                            <h2>Product Category Creation</h2>
                        </div>


                        <div className={s.formGroup}>
                            <input 
                                onChange={handleChange}
                                value={category.name}
                                name='name'
                                type="text"
                                placeholder="Add a New Category"/>
                            {error.name?<span>{error.name}</span>:null}
                            <button 
                                type="submit"
                                onClick={handleSubmit}>
                                    Add
                            </button>

                        </div>

                        
                    </form>
                    <DataTable
                        columns={columns}
                        data={tcategorys}
                    />
                </>) : <h1>no tenes acceso a esta página</h1>}
            </div>
        </>
    )
}
