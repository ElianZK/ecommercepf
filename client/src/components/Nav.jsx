import React, {  useEffect} from 'react'
import s from '../assets/styles/Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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

    return (
        <header className={s.container}>
            <nav className={s.options}>               
                <img className={s.logo} src={logo} onClick={()=>{window.location='/'}} alt="logo ecommerce"/> 
                <SearchBar filters={filters} setFilters={setFilters}/>

                <div className={s.buttons}>
                    <NavMenu isAdmin={isAdmin}/>
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
