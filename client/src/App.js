
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
//import Cart from './components/Shops.jsx/Cart';
import UsersForm from './components/Admin/usersForm';
import BuyHistory from './components/Shops/BuyHistory';
import Checkout from './components/Shops/Checkout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions';
import CantAccess from './components/Admin/CantAccess';
import axios from 'axios';
import Dashboard from './components/Admin/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      dispatch(login(user))
    }else{
      dispatch(login({idUser: null}));
    }
  }, [dispatch])

  const [isAdmin, setIsAdmin] = useState(false);

  const idUser = useSelector(state => state.usersReducer.loginInfo.user.idUser);

  useEffect(() => {
      axios.get("http://localhost:3001/user/type/" + idUser)
      .then(res => {
          let { access } = res.data;
  
          setIsAdmin(access && !!idUser)
      })
  }, [idUser]);

  return (
    <div className="App">
      <Nav isAdmin={isAdmin}/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/detail/:idproduct" element={<Details/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/search/:search" element={<Home/>} />
        
        <Route exact path="/addToCart" element={<Cart />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/userForm" element={<UsersForm/>} />
        <Route exact path="/buyHistory" element={<BuyHistory/>} />
        <Route exact path="/checkout" element={<Checkout />} />

        <Route exact path="/profile" element={<Profile/>} />

        <Route exact path="/dashboard" element={isAdmin? <Dashboard/> : <CantAccess/>} />
        <Route exact path="/addCategory" element={isAdmin? <CatForm/> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/addBrand" element={isAdmin? <BrandForm/> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/products" element={isAdmin? <Products /> : <CantAccess/>} /> {/* admin */}
        <Route exact path="/userForm" element={isAdmin ? <UsersForm/> : <CantAccess/>} /> {/* admin */}
      </Routes>
    </div>
  );
}

export default App;
