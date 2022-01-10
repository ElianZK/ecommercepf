import s from "../assets/styles/Home.module.css";
import Card from './ProductCard.jsx'
import { useEffect, useState } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getAllProducts, 
    getProductByName, 
    sortProducts,
    addToCart,
} from '../actions/index.js'
import { useParams } from "react-router-dom";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";
import imgnotfound from "../assets/img/notfound.gif";
import Swal from 'sweetalert2';

const Home = () => {
    const User = JSON.parse(localStorage.getItem("user"));
    const idUser = !User?null:User.idUser;
    const dispatch = useDispatch();
    const {search=null} = useParams();
    const [sort,setSort] = useState('');
    const [category,setCategory]=useState(null)
    const [brand,setBrand]=useState(null)
    let [limit,setLimit] = useState(15)
    const products = useSelector((state) => {
            if(Array.isArray(state.productsReducer.allProducts)) return state.productsReducer.allProducts;
            return state.productsReducer.allProducts.productsInfo
    }) 

    const total = useSelector((state) => {
        return state.productsReducer.allProducts.total || 0
    }) 
    const [page, setPage] = useState(1);
    const nButtons= Math.ceil(Number(total)/Number(limit))

    const handleChange = (event, value) => {
        event.preventDefault();
        setPage(value);
    };

    const handleChangeLimit = (event)=>{
        event.preventDefault();
        let value=event.target.value;
        setLimit(value)
    }

    function handleFilterByCategory(e){
        e.preventDefault()
        setCategory(e.target.value)
    }

    function handleFilterByBrand(e){
        e.preventDefault()
        setBrand(e.target.value)
    }
    
    function handleSortProducts(e){
        e.preventDefault()
        dispatch(sortProducts(e.target.value))
        setSort(e.target.value)
    }

    function addCart(product){
        console.log("datacard",product)
        console.log("usercard",idUser)
        dispatch(addToCart({...product,amount: 1},idUser.idUser))
        Swal.fire({
            icon: 'success',
            text: 'Producto agregado exitosamente!',
            showConfirmButton: false,
            timer: 2000
        })
    }

    useEffect(()=>{
        const offset=(page-1)*limit;
        if(!search){
            dispatch(getAllProducts({limit: limit,offset: offset,category:category,brand:brand}))
            dispatch(sortProducts(sort))
        }
        else{
            dispatch(getProductByName(search))
        }
    }, [dispatch,page,category,brand,limit])
  

    return (
        <div className={s.container}>
            <Filters handleChangeLimit={handleChangeLimit} handleSortProducts={handleSortProducts} 
            handleFilterByCategory={handleFilterByCategory} handleFilterByBrand={handleFilterByBrand}
            />
            <div className={s.pagination}><Pagination  handleChange={handleChange} nButtons={nButtons}/></div>

            {search?<div className={s.search}><p>Resultados de busqueda de: <strong>{search}</strong></p></div>:null}
            <div className={s.cards}>
                {Array.isArray(products)&&products.length>0?products.map((prod,i)=><Card key={i} id={prod.idProduct} name={prod.name} price={prod.price} image={prod.thumbnail} data={prod} add={addCart}/>)
                :<div className={s.notfound}>
                    <img className={s.imgfound} src={imgnotfound}/>
                    <p>Products not found</p>
                </div>}
            </div>
       </div>
    )
}

export default Home
