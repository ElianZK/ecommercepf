import React,{useEffect, useState} from 'react';
import s from '../assets/styles/Details.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart as Heartwhite } from '@fortawesome/free-regular-svg-icons';
import {faHeart as HeartFill } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductId, addToCart, update, getWishList, addItemToWishList, deleteItemFromWishList} from '../actions/index.js'
//import { Slide } from 'react-slideshow-image'
import { Carousel } from 'react-responsive-carousel';
//import {Carousel} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {formatMoney} from 'accounting'
import Swal from 'sweetalert2';
import Reviews from './Reviews';
import CreateReviews from './CreateReviews';
import style from '../assets/styles/Reviews.module.css'
import {useNavigate} from 'react-router-dom';

const Details = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {idproduct} = useParams();
    const product = useSelector(state => state.productsReducer.productDetail[0])
    const cart = useSelector(state => state.ordenReducer.cart)
    //const prod = JSON.parse(localStorage.getItem('cart')) || [].find(element => element.id === idproduct);
    //const [amount, setAmount] = useState(prod ?.amount||1); 
    const [amount, setAmount] = useState(1); 
    const [search, setSearch] = useState('')
    const [searchres, setSearchres] = useState(null)
    
    // obtengo mi iduser de mi User
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;

    // recibo de mi localstorage.setitem de mi byhistory 
    const byhistory = JSON.parse(localStorage.getItem('byhistory'))
    const wishList = useSelector(state=>state.productsReducer.wishList);
    const [fav, setFav]=useState(Boolean(wishList.find(el=>el.idProduct===idproduct))); 
    let filterhistory;
    if (byhistory===null) {
        filterhistory = []
    } else {
         //comprueba si existe mi idproducto existe en mi orders 
        filterhistory = byhistory.filter(e => e.products.find(p => p.idProduct===idproduct))
    }
   
    

    const columns = [
    {
        name: 'Title',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Info',
        selector: row => row.value,
        sortable: true,
    },
];

function handleAddToCart(e){
    e.preventDefault();
        //dispatch(addToCart(product));
        dispatch(update(Number(amount)))
        if ((Number(amount)) <= product.stock) {
            setAmount(Number(amount));
            dispatch(addToCart({ ...product,amount: amount},idUser,cart))
            Swal.fire({
                icon: 'success',
                text: 'Producto agregado exitosamente!',
                showConfirmButton: false,
                timer: 2000
              })
        };
}

function handleChangeamount(e){
    e.preventDefault();
    setAmount(Number(e.target.value))
}

    
  useEffect(() => {
      dispatch(getProductId(idproduct));
      dispatch(getWishList(idUser));
  }, [dispatch])


  useEffect(()=>{
    if(idUser){
     setFav(Boolean(wishList.find(el=>el.idProduct===idproduct)));
    }else{
      //|falta que esto se ejecute. Ocurre porque el idUser es extraido del localStorage y no del estado del reducer entonces no lo detecta el useEffect
      setFav(false);
    }
  },[wishList, idUser])

  const addToFavourites = async ()=>{
    if(!idUser){
      try{
        let result = await Swal.fire({
          title: 'Inicie Sesión.',
          text: "Para agregar a favoritos debe haberse logueado.",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Iniciar Sesión',
          cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
          navigate('/login');
        }
      }catch(error){
        alert("Debe iniciar sesión");
      }
    }else{
      if(fav){
        dispatch(deleteItemFromWishList(idUser,idproduct));
      }else{
        dispatch(addItemToWishList(idUser,idproduct));
      } 
      setFav(!fav);
    }
  };


    return (
        <>
        {product?<div className={s.container}>
            <div className={s.data}>
                <div className={`${s.subcontainer} ${s.imgcontainer}`}>
                    {/* <Slide easing="ease">
                        <div className={s.images}>
                            {product.image.map((image, i)=>(
                            <div key={i} className={s.image}><img  src={image} alt="Producto"/></div>))}
                        </div>
                    </Slide> */}
                    <Carousel axis="vertical" autoPlay={true} interval={6000} showIndicators={true} infiniteLoop={true} centerMode={true} centerSlidePercentage={true}>
                    {product.image.map((image, i)=>(<div className={s.itemimage}>
                            <div key={i} /* className={s.image} */><img  src={image} alt={`Producto ${i}`} className={s.image}/></div>
                            </div>
                        ))}

                    </Carousel>
                </div>
                <div className={`${s.subcontainer} ${s.details}`}>
                    <button className={s.btnfav} onClick={e=>addToFavourites(e)}><FontAwesomeIcon icon={fav?HeartFill:Heartwhite} /></button>
                    <h2 className={s.prodname}>{product.name}</h2>
                    <p className={s.prodprice}>{` ${formatMoney(product.price)}`}<span > ARS</span></p>
                    {product.stock>0?<div className={s.grupcount}>
                        <label>Cantidad</label>
                        <input type="number" min={1} max={Number(product.stock)} onChange={handleChangeamount} value={amount}/>
                        <label>Disponibles: {product.stock}</label>
                    </div>:<div><span>No disponible por el momento</span></div>}
                    <p className={s.salesnum}><strong>{product.sold_quantity} </strong>Ventas realizadas</p>
                    <button className={`${s.btn}`}>Comprar ahora</button>
                    <button 
                        className={`${s.btn}`} onClick={handleAddToCart}>Agregar al carrito</button>

                </div>
            </div>
            <div className={s.desc}>
                <h3>Información del producto</h3>
                <div className={s.containerSearch}>

                    <input name="name" placeholder="Ingrese su busqueda" onChange={(e)=>{
                            let name= e.target.value;
                            setSearch(name)
                            setSearchres(
                                product?.attributes.filter(p=>{
                                    console.log(p)
                                    return p.name.toLowerCase().includes(name.toLowerCase()) 
                                })
                            )
                        }}/>
                    </div>
                <DataTable
                    pagination
                    columns={columns}
                    data={searchres?searchres:product.attributes}
                />
                {/* <p>El Samsung Galaxy A12 llega con una pantalla HD + de 6.5 pulgadas y potenciado por un procesador de ocho núcleos, 4GB RAM con 64GB de almacenamiento expandible mediante ranura microSD. La cámara posterior del Galaxy A12 es cuádruple, con lentes de 48MP, 5MP, 2MP y 2MP, mientras que la cámara frontal para selfies es de 8 megapíxeles. Completando las características del Samsung Galaxy A12 encontramos una batería de 5000 mAh de carga rápida, lector de huellas montadas de lado, y Android 10 a bordo. 
                    Pantalla HD + de 6.5 pulgadas$$ Almacenamiento expandible mediante ranura microSD$$Cámara posterior del Galaxy A12 es cuádruple, con lentes de 48MP, 5MP, 2MP y 2MP, mientras que la cámara frontal para selfies es de 8 megapíxeles$$Sensores: Huella digital (lateral), acelerómetro, Batería: 5000 mAh, Procesador: Octa-core 2.35 GHz</p> */}
            </div>
            {/* parte de los REVIEWS */}
            <div className={style.total_review} >
                
                {
                    (idUser === null || idUser === null || filterhistory.length ===0 )
                    ?(
                        <div>
                            <Reviews idproduct={idproduct} />
                        </div>
                    )
                    :(
                        <div>                        
                            {/* componente que crea el review */}   
                            <div  className={style.create_reviews} >
                                <CreateReviews idproduct={idproduct} idUser={idUser} />
                            </div>
                            {/* componente que muestra mis review por producto */}
                            <div>
                                <Reviews idproduct={idproduct} />
                            </div>
                        </div>
                    )
                }
                    
               
            </div>
            
        </div>:<div></div>}

        
        </>
    )
}

export default Details;