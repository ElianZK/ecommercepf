import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { forgot_password } from "../../actions";
import style from '../../assets/styles/Password.module.css';
import Swal from "sweetalert2";

const ForgotPassword = () => {
const {id} =  useParams()
    let pass = useSelector(state => state.usersReducer.forgot_password);
    const dispatch = useDispatch();
    const [values, setValues]=useState({
        email:'',

    });
    // console.log('pass :>> ', pass);
    if (pass.message === 'Invalid email') {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'No esta Registrado este Email',
            showConfirmButton: false,
            })
        setTimeout(() => {
            window.location = `/users/forgotPassword`;
        }, 1500);
        
    } else if(pass.message ==='Check your email') {
        Swal.fire({
            title:'En unos minutos le llegara un mensaje a su Email o Correo para cambiar su Password o Contraseña, por el momento puede seguir viendo nuestros productos, gracias.',
            showConfirmButton: false,})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgot_password(values))
        setValues({
            ...values,
            email:''
        })
        setTimeout(() => {
            window.location = `/`
        }, 6000);
        
    }

    const handleOnChange =(e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className={style.password}  >
        {/* <p>le llegara un mensaje a su Email para cambiar su password</p> */}
            <form className={style.formulario} onSubmit={onSubmit} >                
                <p className={style.titulo}>Email</p>
                <input
                    type="email"
                    className={style.inputEmail}
                    placeholder="Ingresa Tu Correo Aquí por favor"
                    name="email"
                    value={values.email}
                    onChange={handleOnChange}
                >
                </input>
                <button
                    type="submit"
                    className={style.button}
                    
                >
                    Enviar
                </button>

            </form>
        </div>
    )

}

export default ForgotPassword;