import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgot_password } from "../../actions";
import style from '../../assets/styles/Password.module.css'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const [values, setValues]=useState({
        email:''
    });

    const onSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgot_password(values))
    }

    const handleOnChange =(e) =>{
        console.log('value :>> ', e.target.value);
        console.log('name :>> ', e.target.name);
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className={style.password}  >
            <form className={style.formulario} onSubmit={onSubmit} >

                <p className={style.titulo}>Email</p>
                <input
                    type="email"
                    className={style.inputEmail}
                    placeholder="Ingresa Tu Correo Aquí"
                    name="email"
                    value={values.email}
                    onChange={handleOnChange}
                >
                </input>
                <button
                    type="submit"
                    className={style.button}
                    
                >
                    Reset Password
                </button>

            </form>
        </div>
    )

}

export default ForgotPassword;