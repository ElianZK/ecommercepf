
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
import BuyHistory from './components/Shops/BuyHistory';
import BuyDetail from './components/Shops/BuyDetail';

function App() {
  
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/detail/:idproduct" element={<Details/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/search/:search" element={<Home/>} />
        <Route exact path="/addCategory" element={<CatForm/>} />
        <Route exact path="/addBrand" element={<BrandForm/>} />
        <Route exact path="/addToCart" element={<Cart />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/userForm" element={<UsersForm/>} />
        <Route exact path="/buyHistory" element={<BuyHistory/>} />
        <Route exact path="/buyDetail" element={<BuyDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
