import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { logOut,  login } from '../actions';
import logo from '../assets/img/logo-ecommerce.png';
import {ShoppingCart} from '@material-ui/icons';
import {Badge} from '@material-ui/core';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import s from '../assets/styles/Nav.module.css';

const Nav = ({filters, setFilters}) => {
    // const user = useSelector(state => {
    //     console.log(state.usersReducer)
    //     return state.usersReducer.loginInfo.user;
    // });
   
    const cart = useSelector(state => state.ordenReducer.cart)
    let totalItems = cart && [].concat(cart).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount), 0)
    //let totalItems = cart.lenght

    return (
        <header className={s.container}>
            <nav className={s.options}>               
                <img className={s.logo} src={logo} onClick={()=>{window.location='/'}} alt="logo ecommerce"/> 
                <SearchBar filters={filters} setFilters={setFilters}/>
                <div className={s.buttons}>
                    {/* {user.idUser ? <> */}
                        <NavMenu/>
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
                </div>
            </nav>
            
        </header>
    )
}

export default Nav
