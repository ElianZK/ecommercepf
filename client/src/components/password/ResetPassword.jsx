import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { reset_password } from "../../actions";
import style from '../../assets/styles/Password.module.css';


const ResetPassword = () => {

  const dispatch = useDispatch()
  const {id,token} = useParams();

  console.log('id :>> ', id);
  console.log('token :>> ', token);
  const [values, setValues] = useState({
    password:''
  });

  const onchange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    dispatch(reset_password(id,token,values))
    setValues({
      ...values,
      password:''
    })
    window.location = `/`
  }


  return(
    <div className={style.password} >
      <form  className={style.formulario} onSubmit={onSubmit}>
        <p className={style.titulo} >ingresa tu contraseña nueva</p>
        <input
        type="password"
        value={values.password}
        onChange={onchange}
        name="password"
        className={style.inputEmail}
        >
        </input>
        <button
        type="submit"
        className={style.button}
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword;