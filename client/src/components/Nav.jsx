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
<<<<<<< HEAD


    const {signOut} = useGoogleLogout({
        clientId: "855728735481-riucm0j1968aq5bec0cp3qligm443549.apps.googleusercontent.com",
        onLogoutSuccess: () => {
            dispatch(logOut())

            Swal.fire({
                title: "logOut",
                text: "Usted ha cerrado su sesión",
                icon: "info"
            })
        },
        onFailure: () => {}
    })
=======
    const navigate = useNavigate();
   
    const cart = useSelector(state => state.ordenReducer.cart)
    let totalItems = cart && [].concat(cart).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.amount), 0)
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;
    useEffect(() => {
        dispatch(getProductsCartUser(idUser)); 
    }, [dispatch]); 
>>>>>>> origin/develop-fran

    return (
        <header className={s.container}>
            <nav className={s.options}>               
                <img className={s.logo} src={logo} onClick={()=>{window.location='/'}} alt="logo ecommerce"/> 
                <SearchBar filters={filters} setFilters={setFilters}/>

                <div className={s.buttons}>
<<<<<<< HEAD
                    {session.isConnected ? <>
                        <h1>{session.user.name}</h1>
                        <button className={s.btn} onClick={() => signOut()}>cerrar sesión</button>
                    </> : <>
                        <Link to="/login"><button className={s.btn}>Log In</button></Link>
                        <Link to="/register"><button className={s.btn}>Registrarse</button></Link>
                        <Link to="/cart"><button className={s.btn}>Cart
                       
                        </button></Link>
                    </>}
=======
                    <NavMenu isAdmin={isAdmin}/>
                    <Link to='/cart' className='nav_links' >
                        <Badge badgeContent={totalItems} color='secondary'>
                        <ShoppingCart fontSize='large' color='primary' />
                        </Badge>
                    </Link>
>>>>>>> origin/develop-fran
                </div>
            </nav> 
        </header>
    )
}

export default Nav
