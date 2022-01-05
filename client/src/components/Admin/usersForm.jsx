import { getBrands, createBrands, removeBrands, getUsers, createUser, updateUser } from "../../actions/index";
import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import s from '../../assets/styles/BrandForm.module.css';
import s2 from '../../assets/styles/CategoryForm.module.css';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
/* import { DataGrid } from '@mui/x-data-grid'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

export default function UsersForm (){
    const dispatch = useDispatch();

    const registerInfo = useSelector(state => state.usersReducer.registerInfo);

    useEffect(() => {
        if(registerInfo !== null){
            if(registerInfo.created){
                Swal.fire({
                    icon: "success",
                    title: "User creado",
                    text: "El user fue creado con éxito",
                    timer: 2000
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: registerInfo.message,
                    timer: 2000
                });
            }
        }
    }, [registerInfo])

    const [edit, setEdit] = useState({on: false, id: null});

    const users = useSelector(state => {
        let {users} = state.usersReducer;

        users = users ? users.map((user,i)=>{
            return {
                key: user.idUser,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                phone: user.phone,
    
                buttons: [
                    <abbr title="Editar user" key={0}><button className={s2.btnEdit} onClick={(e) => {
                        //dispatch(updateUser(user.idUser))
                        setEdit({id: user.idUser, on: true})
                        setNewUser({
                            name: user.name,
                            lastname: user.lastname,
                            email: user.email,
                            password: user.password,
                            phone: user.phone,
                            type: user.type
                        })
                    }}><FontAwesomeIcon icon={faEdit}/></button></abbr>,
                    <abbr title="Eliminar user" key={1}><button className={s2.btnDel} onClick={""}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr>
                ]
            }
        }) : [];

        return users;
    });
    
    const [search, setSearch] = useState('');

    const [searchres, setSearchres] = useState(null);
    
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        
        {
            name: 'Lastname',
            selector: row => row.lastname,
            sortable: true,
        },
        
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },

        {
            name: 'Password',
            selector: row => row.password,
            sortable: true,
        },

        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },

        {
            name: "Actions",
            selector: row => row.buttons,
        }
    ]

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        type: "user",
    });

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return(
        <>
            <div className={s.Container}>
                {/* <!-- AÑADIR COMPONENTE NAVBAR -->
                <!-- AÑADIR BOTON DESPLEGABLE PERFIL --> */}
                <form className={s.Form} onSubmit={e => {
                    e.preventDefault();

                    if(newUser.name === "" || newUser.lastname === "" || newUser.email === "" || newUser.password === "" || newUser.phone === ""){
                        Swal.fire({
                            icon: "error",
                            title: "campo vacío",
                            text: "revise si hay algun campo vacío"
                        })
                    }else{
                        if(!edit.on){
                            dispatch(createUser(newUser));
                        }else{
                            console.log("actualizar")
                            dispatch(updateUser(edit.id, newUser))
                            setEdit({on: false, id: null});

                            Swal.fire({
                                icon: "success",
                                title: "Usuario editado con éxito"
                            })
                        }

                        setNewUser({
                            name: '',
                            lastname: '',
                            email: '',
                            password: '',
                            phone: '',
                            type: "user",
                        })


                        dispatch(getUsers());
                    }
                }}>
                    <div className={s.Title}> 
                        <h2>user Creation</h2>
                    </div>

                    <div className={s.InputSelect}>
                        <div className={s.formGroup}>
                            <input 
                                type="text"
                                placeholder="name"
                                value={newUser.name}
                                onChange={e => setNewUser(prev => {
                                    return{
                                        ...prev,
                                        name: e.target.value
                                    }
                                })} 
                            />

                            <input 
                                type="text"
                                placeholder="last name"
                                value={newUser.lastname}
                                onChange={e => setNewUser(prev => {
                                    return{
                                        ...prev,
                                        lastname: e.target.value
                                    }
                                })} 
                            />

                            <input 
                                type="email"
                                placeholder="email"
                                value={newUser.email}
                                onChange={e => setNewUser(prev => {
                                    return{
                                        ...prev,
                                        email: e.target.value
                                    }
                                })} 
                            />

                            <input 
                                type="password"
                                placeholder="password"
                                value={newUser.password}
                                onChange={e => setNewUser(prev => {
                                    return{
                                        ...prev,
                                        password: e.target.value
                                    }
                                })} 
                            />

                            <input 
                                type="text"
                                placeholder="phone"
                                value={newUser.phone}
                                onChange={e => setNewUser(prev => {
                                    return{
                                        ...prev,
                                        phone: e.target.value
                                    }
                                })} 
                            />

                            <select onChange={e => setNewUser(prev => {
                                return{
                                    ...prev,
                                    type: e.target.value
                                }
                            })}>
                                <option selected={newUser.type === "user" ? true : false} value="user">normal User</option>
                                <option selected={newUser.type === "admin" ? true : false} value="admin">admin</option>
                            </select>

                            <button type="submit">{edit.on ? "editar" : "crear"}</button>

                        </div>
                        
                        <br></br>
                    </div>
                </form>

                <div className={s.containerSearch}>
                    <input name="name" placeholder="Ingrese la marca" onChange={(e)=>{
                        let name= e.target.value;
                        setSearch(name)
                        setSearchres(
                            users.filter(user=>{
                                return user.name.includes(name)
                            })
                        )
                    }}/>
                </div>
                <DataTable
                    columns={columns}
                    data={searchres ? searchres : users} 
                    pagination
                />
            </div>
        </>
    )
}




            