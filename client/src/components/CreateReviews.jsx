import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from '../assets/styles/Reviews.module.css';
import ReactStars from "react-rating-stars-component";


const CreateReviews = (props) => {
    console.log('props :>> ', props);
    const dispatch = useDispatch();
    const [values,setValues] = useState({
        score:"",
        review:"",
        productIdProduct:props.idproduct,
        userIdUser:""
    })
    const handleOnChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log('setValues :>> ', values);
    }
    const ratingChanged = (newRating) => {
        console.log('newRating :>> ', newRating);
        setValues({
            ...values,
            score:newRating
        })
        console.log('setValues :>> ', values);
    };

    const onSubmit = e => {// funcion que enviara los datos de mi formulario 
        e.preventDefault()
        dispatch()
      
    }

    return (
        <div>
            <form className={style.form_review} onSubmit={onSubmit}>
                {/* ratings */}
                <div className={style}>
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
                />
                </div>
                {/* caja del comentario */}
                <div className={style.caja}>
                    <textarea
                    className={style.description}
                    title="Ingrese su comentario aqui"
                    placeholder="ingrese su comentario"
                    // rows="3"
                    // cols="70"
                    resize="none"
                    value={values.review}
                    onChange={handleOnChange}
                    name="review" 
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