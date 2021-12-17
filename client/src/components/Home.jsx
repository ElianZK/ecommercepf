import s from "../assets/styles/Home.module.css";
import Card from './ProductCard.jsx'
import { useEffect, useState } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getAllProducts, 
    getProductByName, 
    sortProducts,
} from '../actions/index.js'
import { useParams } from "react-router-dom";
import Filters from "./Filters.jsx";
import Pagination from "./Pagination.jsx";
import imgnotfound from "../assets/img/notfound.gif";

import {formatMoney} from 'accounting'


const Home = () => {
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
        console.log(state)
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

    useEffect(()=>{
        const offset=(page-1)*limit;
        console.log('category: '+category)
        if(!search)dispatch(getAllProducts({limit: limit,offset: offset,category:category,brand:brand}))
        else{
            dispatch(getProductByName(search))
        }
        console.log(products)
    }, [dispatch,page,category,brand,limit])
  

    return (
        <div className={s.container}>
            <Filters handleChangeLimit={handleChangeLimit} handleSortProducts={handleSortProducts} 
            handleFilterByCategory={handleFilterByCategory} handleFilterByBrand={handleFilterByBrand}
            />
            <div className={s.pagination}><Pagination  handleChange={handleChange} nButtons={nButtons}/></div>

            {search?<div className={s.search}><p>Resultados de busqueda de: <strong>{search}</strong></p></div>:null}
            <div className={s.cards}>
                {Array.isArray(products)&&products.length>0?products.map((prod,i)=><Card key={i} id={prod.idProduct} name={prod.name} price={prod.price} image={prod.thumbnail}/>)
                :<div className={s.notfound}>
                    <img className={s.imgfound} src={imgnotfound}/>
                    <p>Products not found</p>
                </div>}
            </div>
       </div>
    )
}

export default Home
