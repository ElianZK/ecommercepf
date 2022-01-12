import s from "../assets/styles/Home.module.css";
import Card from './ProductCard.jsx'
import { useEffect, useState } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getAllProducts, getCategories, addToCart} from '../actions/index.js'
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";
import imgnotfound from "../assets/img/notfound.gif";
import Swal from 'sweetalert2';

const Home = ({filters,setFilters}) => {
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;
    const cart = useSelector(state => state.ordenReducer.cart)
    const dispatch = useDispatch();

    const products = useSelector((state) => {
            if(Array.isArray(state.productsReducer.allProducts)) return state.productsReducer.allProducts;
            return state.productsReducer.allProducts.productsInfo
    }) 

    const total = useSelector((state) => {
        return state.productsReducer.allProducts.total || 0
    }) 
    const [page, setPage] = useState(1);
    const nButtons= Math.ceil(Number(total)/Number(filters.limit))

    const handleChange = (event, value) => {
        event.preventDefault();
        setPage(value);
    };
    
    const handleCloseSearch = ()=>{
      setFilters(oldState=>({...oldState, search:''}));
    };
    
    function addCart(product){
        //! console.log("datacard",product)
        //! console.log("usercard",idUser)  
        dispatch(addToCart({...product,amount: 1},idUser,cart))
        Swal.fire({
            icon: 'success',
            text: 'Producto agregado exitosamente!',
            showConfirmButton: false,
            timer: 2000
        })
    }
    useEffect(()=>{
      dispatch(getCategories());
    }, [dispatch]);

    useEffect(()=>{
      const offset=(page-1)*filters.limit;
      dispatch(getAllProducts({...filters,offset: offset}))
      //! console.log("HOME USEFFECT")
      //dispatch(sortProducts(filters.sort))

    }, [dispatch,page,filters])
  

    return (
        <div className={s.container}>
            {Array.isArray(products)&&products.length>0?<Filters setFilters={setFilters} setPage={setPage} Pagination={Pagination} page={page} handleChange={handleChange} nButtons={nButtons}/>:null}
            
            {filters.search?<div className={s.search}><p>Resultados de busqueda de: <strong>{filters.search}</strong></p><button onClick={handleCloseSearch}>X</button></div>:null}
            <div className={s.cards}>
                {Array.isArray(products)&&products.length>0?products.map((prod,i)=><Card key={i} id={prod.idProduct} name={prod.name} price={prod.price} image={prod.thumbnail} data={prod} add={addCart}/>)
                :<div className={s.notfound}>
                    <img className={s.imgfound} src={imgnotfound} alt="NotFound"/>
                    <p>Products not found</p>
                </div>}
            </div>
       </div>
    )
}

export default Home
