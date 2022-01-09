
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Details from './components/Details'
import Nav from './components/Nav'
import Register from './components/Register'
import CatForm from './components/Admin/CategoryForm'
import BrandForm from './components/Admin/BrandForm'
import Products from './components/Admin/Products'
import Cart from './components/Shops/Cart';
//import Cart from './components/Shops.jsx/Cart';
import UsersForm from './components/Admin/usersForm';
import Checkout from './components/Shops/Checkout'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './actions';

//TODO: FALTA HACER LA RUTA DE ADMIN ACÁ CON LAS RUTAS INTERNAS. QUE EN LA DE ADMIN SE COMPRUEBE EL USUARIO 

function App() {
  const dispatch = useDispatch();
  const  [filters, setFilters] = useState({
    sort: '',
    category: '',
    brand: '',
    limit: 15,  
    minPrice: 0,
    maxPrice: null,
    search: ''
  })
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      console.log("hay un user conectado");
      dispatch(login(user))
    }else{
      console.log("no hay nadie conectado")
      dispatch(login({idUser: null}));
    }
  }, [dispatch])

  return (
    <div className="App">
      <Nav filters={filters} setFilters={setFilters}/>
      <Routes>
        <Route exact path="/" element={<Home filters={filters} setFilters={setFilters}/>} />
        <Route exact path="/search/:search" element={<Home filters={filters} setFilters={setFilters}/>} />
        <Route exact path="/detail/:idproduct" element={<Details/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/addCategory" element={<CatForm/>} />
        <Route exact path="/addBrand" element={<BrandForm/>} />
        <Route exact path="/addToCart" element={<Cart />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/userForm" element={<UsersForm/>} />
        <Route exact path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
