import React from 'react'
import s from '../assets/styles/Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import { useEffect, useState } from 'react';
import { useGoogleLogout } from 'react-google-login'; 
import { logOut, addToCart, login } from '../actions';
import Swal from 'sweetalert2';
import SearchBar from './SearchBar'
import logo from '../assets/img/logo-ecommerce.png'
import {ShoppingCart} from '@material-ui/icons';
import {Badge} from '@material-ui/core';

const Nav = () => {
    const user = useSelector(state => {
        console.log(state.usersReducer)
        return state.usersReducer.loginInfo.user;
    });
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.ordenReducer.cart)
    let totalItems = cart && [].concat(cart).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.qty), 0)
    //let totalItems = cart.lenght

    return (
        <header className={s.container}>
            <nav className={s.options}>               
                <img className={s.logo} src={logo} onClick={()=>{window.location='/'}} alt="logo ecommerce"/> 
                <SearchBar />
                <div className={s.buttons}>
                    {user.idUser ? <>
                        <h1>{user.name}</h1>
                        <button className={s.btn} onClick={() => {
                            localStorage.setItem("user", JSON.stringify({idUser: null}));
                            dispatch(login({idUser: null}));
                        }}>cerrar sesión</button>
                        
                        <Link to='/cart' className='nav_links' >
                            <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart fontSize='large' color='primary' />
                            </Badge>
                        </Link>
                    </> : <>
                        <Link to="/login"><button className={s.btn}>Log In</button></Link>
                        <Link to="/register"><button className={s.btn}>Registrarse</button></Link>
                    </>}
                </div>
            </nav>
            
        </header>
    )
}

export default Nav
