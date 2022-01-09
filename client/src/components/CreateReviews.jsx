import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from '../assets/styles/Reviews.module.css';
import ReactStars from "react-rating-stars-component";
import { CreateReview } from "../actions";

const CreateReviews = (props) => {
    // console.log('props :>> ', props);
    const dispatch = useDispatch();
    const [values,setValues] = useState({
        score:"",
        description:"",
        productIdProduct:props.idproduct,
        userIdUser:'f279d816-97c9-4855-9b3c-d3998f62a7b1'
    })

    // cambio de comentarios
    const handleOnChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        // console.log('Values :>> ', values);
    }

    //cambio de rating o star o puntuacion
    const ratingChanged = (newRating) => {
        console.log('newRating :>> ', newRating);
        setValues({
            ...values,
            score:newRating.toString()
        })
        // console.log('Values :>> ', values);
    };

    const onSubmit = e => {// funcion que enviara los datos de mi formulario 
        e.preventDefault()
        dispatch(CreateReview(props.idproduct, values))
        setValues({
            score:"",
        description:""
        })
    }

    useEffect(()=>{
        
    },[])

    return (
        <div>
            <form className={style.form_review} onSubmit={onSubmit}>
                {/* ratings o stars */}
                <div className={style.createStar}>
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
export default CreateReviews;