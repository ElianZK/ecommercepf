import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import style from '../assets/styles/Reviews.module.css';
import ReactStars from "react-rating-stars-component";
import { update_review } from "../actions";
import Swal from 'sweetalert2';

const EditReview = () => {
    const idparams = useParams();
    console.log('idproduct :>> ', idparams);
    const dispatch = useDispatch();
    const [values,setValues] = useState({
        score:"",
        description:"",
        // productIdProduct:props.idproduct,
        // userIdUser:props.idUser.idUser
    })

    // cambio de comentarios
    const handleOnChange = e => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log('Values :>> ', values);
    }

    //cambio de rating o star o puntuacion
    const ratingChanged = (newRating) => {
        // console.log('newRating :>> ', newRating);
        setValues({
            ...values,
            score:newRating.toString()
        })
        console.log('Values :>> ', values);
    };

    const onSubmit = e => {// funcion que enviara los datos de mi formulario 
        e.preventDefault()
        if (values.score ==='' ||  values.description === '') {
            Swal.fire({
                icon: 'error',
                title: 'Ups.. Falta Ingresar la puntuación de ★★★★★ o el Comentario ',
                // text: 'o un comentario',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            dispatch(update_review(idparams.id, idparams.idReview, values))
            setValues({
                score:"",
            description:""
            })
            // window.location = `/product/${idparams.id}/idReview/${idparams.idReview}`
            window.location = `/detail/${idparams.id}`
        }
        
    }

    // useEffect(()=>{
    //     window.location.href = `http://localhost:3000/detail/${props.idproduct}`
    // },[props.idproduct])

    return (
        <div className={style.editar_form}>
            <form className={style.form_review} onSubmit={onSubmit}>
                {/* ratings o stars */}
                <div className={style.createStar}>
                    <p>selecciona tu estrella</p>
                    <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={28}
                    // activeColor="#ffd700"
                    activeColor="rgb(0, 72, 181)"
                    />
                </div>
                {/* caja del comentario */}
                <div className={style.caja}>
                    <textarea
                    className={style.description}
                    title="maximo 120 caracteres"
                    placeholder="Ingrese su Comentario"
                    // rows="3"
                    // cols="70"
                    resize="none"
                    value={values.description}
                    onChange={handleOnChange}
                    name="description"
                    maxLength="120"                
                    >
                    </textarea>
                    <button
                    type="submit"
                    className={style.boton}
                    title="Click aqui para enviar comentario"
                    >
                    Enviar Comentario
                    </button>
                </div>
                
            </form>
        </div>
    )
}
export default EditReview;