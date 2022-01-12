import React, {  useEffect} from 'react'
import s from '../assets/styles/Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import { useEffect, useState } from 'react';
import { useGoogleLogout } from 'react-google-login'; 
import { logOut,  login } from '../actions';
import Swal from 'sweetalert2';
import SearchBar from './SearchBar'
import logo from '../assets/img/logo-ecommerce.png'
import {ShoppingCart} from '@material-ui/icons';
import {Badge} from '@material-ui/core';
import NavMenu from './NavMenu'
import {getProductsCartUser} from '../actions/index'

const Nav = ({isAdmin,filters, setFilters}) => {
    const user = useSelector(state => state.usersReducer.loginInfo.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const cart = useSelector(state => state.ordenReducer.cart)
    let totalItems = cart && [].concat(cart).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount), 0)
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;
    useEffect(() => {
        dispatch(getProductsCartUser(idUser)); 
    }, [dispatch]); 

    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <header className={s.container}>
            <nav className={s.options}>               
                <img className={s.logo} src={logo} onClick={()=>{navigate("/")}} alt="logo ecommerce"/> 
                <SearchBar filters={filters} setFilters={setFilters}/>

                <div className={s.buttons}>
                    {/* {user.idUser ? <> */}
                        <NavMenu isAdmin={isAdmin}/>
                        {/* <h1>{user.name}</h1> */}
                        {/* <button className={s.btn} onClick={() => {
                            localStorage.setItem("user", JSON.stringify({idUser: null}));
                            dispatch(login({idUser: null}));
                        }}>cerrar sesión</button> 
                        
                    </> : <>
                        <Link to="/login"><button className={s.btn}>Log In</button></Link>
                        <Link to="/register"><button className={s.btn}>Registrarse</button></Link>
                    </>}*/}
                        <Link to='/cart' className='nav_links' >
                            <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart fontSize='large' color='primary' />
                            </Badge>
                        </Link>
                    {/* {user.idUser ? <>
                        <div class={s.group}>
                            {isAdmin ? <Link to="/dashboard">Dashboard</Link> : null}

                            <Link to="/profile">
                                <div className={s.profile}>
                                    <img className={s.photo} src={user.image} alt="" />
                                    <span className={s.name}>{user.name}</span>
                                </div>
                            </Link>

                            <Link to='/cart' className='nav_links' >
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart fontSize='large' color='primary' />
                                </Badge>
                            </Link>
                            
                            <button className={s.btn} onClick={() => {
                                localStorage.setItem("user", JSON.stringify({idUser: null}));
                                dispatch(login({idUser: null}));
                                navigate("/");
                            }}>cerrar sesión</button>
                        </div>
                    </> : <>
                        <div class={s.group}>
                            <Link to="/login"><button className={s.btn}>Log In</button></Link>
                            <Link to="/register"><button className={s.btn}>Registrarse</button></Link>
                        </div>
                    </>} */}
                </div>
            </nav> 
        </header>
    )
}

export default Nav
