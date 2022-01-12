import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminar_review, get_Review } from "../actions";
import style from '../assets/styles/Reviews.module.css';
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Reviews = (props) => {

    const get_review = useSelector(state => state.reviewReducer.getreview);
    localStorage.setItem('review', JSON.stringify(get_review))
    const dispatch = useDispatch();
    //obtengo mi usuario parseado
    const usuario =  JSON.parse(localStorage.getItem('user'));
    // para sacar el promedio del score/usuarios
    const tamaño = get_review.length
    let y = 0
    for (let i = 0; i < tamaño; i++) {
        y += parseInt(get_review[i].score);
    }
    //promedio de todos mis reviews
    let promedio = y/tamaño
    // console.log(' :>> ',Math.round(promedio));

    useEffect(()=>{
        dispatch(get_Review(props.idproduct))
    },[dispatch, props.idproduct])

    // array interno para darle valor a cada estrella seleccionada
    const VALOR = ['Insuficiente','Aceptable','Normal','Bueno', 'Excelente']

    // funcion que pasa el paramtro idproducto e idreview
    function deletereview(prod, id){
        // mi alerta antes de eliminar mi review
        Swal.fire({
            title: 'Estas Seguro que quieres eliminar tu Review?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!'
            }).then((result) => {
            if (result.isConfirmed) {
                dispatch(eliminar_review(prod,id))
                Swal.fire(
                'Eliminado!',
                'Su Review ha sido eliminada.',
                'Éxito'
                )
            }
            });
    }


    return(
        // comprueba si existe el promedio
        Math.round(promedio)
        ?<div >     
        <p className={style.titulo_review}>Opiniones sobre el Producto</p>   
        <div className={style.cuadro_barras} >
            <div className={style.promedio}>
                {
                    promedio.toFixed(1)//promedio de todos mis reviews 
                }
                <ReactStars
                    count={5}
                    value={promedio.toFixed(1)}
                    size={28}
                    edit={false}
                    // activeColor="#ffd700"
                    activeColor="rgb(0, 72, 181)"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                />
                <p className={style.tamaño_opinion}>
                    Promedio entre {tamaño} Opiniones
                </p>
            </div>
            <div>                
                {/* *********count 5************** */}
                <div className={style.count_star}>
                    <p>5 estrellas</p>
                        <progress
                        className={style.barra_exterior}
                        max="100"
                        value={((get_review.filter((a) => parseInt(a.score)===5 )).length)*3}
                        >
                        </progress>
                    {(get_review.filter((a) => parseInt(a.score)===5 )).length}
                </div>
                {/* ************count 4**************** */}
                <div className={style.count_star}>
                    <p>4 estrellas</p>
                    <progress
                        className={style.barra_exterior}
                        max="100"
                        value={((get_review.filter((a) => parseInt(a.score)===4 )).length)*3}
                    >
                    </progress>
                    {(get_review.filter((a) => parseInt(a.score)===4 )).length}
                </div>
                {/* **************count 3******************* */}
                <div className={style.count_star}>
                    <p>3 estrellas</p>
                    <progress
                        className={style.barra_exterior}
                        max="100"
                        value={((get_review.filter((a) => parseInt(a.score)===3 )).length)*3}
                        >
                        </progress>
                    {(get_review.filter((a) => parseInt(a.score)===3 )).length}
                </div>
                {/* **************count 2******************* */}
                <div className={style.count_star}>
                    <p>2 estrellas</p>
                    <progress
                        className={style.barra_exterior}
                        max="100"
                        value={((get_review.filter((a) => parseInt(a.score)===2 )).length)*3}
                    >
                    </progress>
                    {(get_review.filter((a) => parseInt(a.score)===2 )).length}
                </div>
                {/* **************count 1******************* */}
                <div className={style.count_star}>
                    <p>1 estrellas</p>
                    <progress
                        className={style.barra_exterior}
                        max="100"
                        value={((get_review.filter((a) => parseInt(a.score)===1 )).length)*3}
                        >
                        </progress>
                    {(get_review.filter((a) => parseInt(a.score)===1 )).length}
                </div>
            </div>
        </div>
            {
                get_review.map((e,index) => 
                <div key={index} className={style.review_comentario} >
                <div>
                {/* vista del conteo de star */}
                <ReactStars
                    count={5}
                    value={parseInt(e.score)}
                    size={24}
                    edit={false}
                    // activeColor="#ffd700"
                    activeColor="rgb(0, 72, 181)"
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                />
                </div>
                <div className={style.valor_review} >
                    {
                        VALOR.filter((a,index) => index === parseInt(e.score)-1 )
                    }
                </div>
                <div >
                {
                    (e.userIdUser === usuario.idUser)
                    ?(
                        <div className={style.editar_remove}>
                        {e.description} 
                            <div  className={style.editar_remove}>
                                <Link
                                    className={style.boton_editar}
                                    to={`/product/${e.productIdProduct}/review/${e.idReviews}`}
                                >
                                    <FontAwesomeIcon icon={faEdit}/> Editar
                                </Link>
                                <button
                                    type="button"
                                    className={style.boton_eliminar}
                                    onClick={()=>deletereview(e.productIdProduct,e.idReviews)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt}/> Eliminar
                                </button>
                            </div>                        
                        </div>
                    )
                        :<div>
                        {e.description}
                        </div>

                }
                    

                    
                    
                </div>
                
                </div>
                )
            }
            <div>
            <p> Copyright © 2021-2022 RENRECOMMERCE S.R.L.</p>
            <p>soyHenry</p>
            <p>¡Descarga gratis la app de RENRECOMMERCE!</p> 
            </div>           
        </div>
        :<div>
            <div className={style.comentario_vacio} >
            <ReactStars
                        count={5}
                        size={28}
                        edit={false}
                        // activeColor="#ffd700"
                        activeColor="rgb(0, 72, 181)"

                        emptyIcon={<i className="far fa-star"></i>}
                    />
                Sin Puntuacion y Comentarios
            </div>        
        <div>
            <p> Copyright © 2021-2022 RENRECOMMERCE S.R.L.</p>
            <p>soyHenry</p>
            <p>¡Descarga gratis la app de RENRECOMMERCE!</p> 
            </div> 
        </div>
                
    )

}

export default Reviews;