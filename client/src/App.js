
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
import Profile from './components/Profile.jsx';
import BuyHistory from './components/Shops/BuyHistory'
import UsersForm from './components/Admin/usersForm';
import Checkout from './components/Shops/Checkout';
import OrdersPannel from './components/Admin/Orders';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions';
import CantAccess from './components/Admin/CantAccess';
import axios from 'axios';
import Dashboard from './components/Admin/Dashboard';

//TODO: FALTA HACER LA RUTA DE ADMIN ACÁ CON LAS RUTAS INTERNAS. QUE EN LA DE ADMIN SE COMPRUEBE EL USUARIO 
import EditReview from './components/EditReview';

function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(true);

  //const idUser = useSelector(state => state.usersReducer.loginInfo.user.idUser);
  const user = JSON.parse(localStorage.getItem("user"));
  const idUser = !user?null:user.idUser;
  const  [filters, setFilters] = useState({
    sort: '',
    category: '',
    brand: '',
    limit: 15,  
    minPrice: 0,
    maxPrice: null,
    search: ''
  })

  useEffect(async() => {
    await axios.post("http://localhost:3001/user/adminExists");
    //const user = JSON.parse(localStorage.getItem("user"));
    
    if(user){
      dispatch(login(user))
    }else{
      dispatch(login({idUser: null}));
    }
  }, [dispatch])

  

  useEffect(() => {
      axios.get("http://localhost:3001/user/type/" + idUser)
      .then(res => {
          let { access } = res.data;
  
          setIsAdmin(access && !!idUser)
      })
  }, [idUser]);
  return (
    <div className="App">
      <Nav isAdmin={isAdmin} filters={filters} setFilters={setFilters}/>
      <Routes>
        <Route exact path="/" element={<Home filters={filters} setFilters={setFilters}/>} />
        <Route exact path="/detail/:idproduct" element={<Details/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />        
        <Route exact path="/addToCart" element={<Cart />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/buyHistory" element={<BuyHistory/>} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/admin/orders" element={<OrdersPannel />} />

        <Route exact path="/profile" element={<Profile/>} />

        <Route exact path="/dashboard" element={isAdmin? <Dashboard/> : <CantAccess/>} />
        <Route exact path="/addCategory" element={isAdmin? <CatForm/> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/addBrand" element={isAdmin? <BrandForm/> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/products" element={isAdmin? <Products /> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/userForm" element={isAdmin ? <UsersForm/> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/product/:id/review/:idReview" element={<EditReview/>} />
      </Routes>
      
    </div>
  );
}

export default App;
