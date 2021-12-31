
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Details from './components/Details'
import Nav from './components/Nav'
import Register from './components/Register'
<<<<<<< Updated upstream
=======
import CatForm from './components/Admin/CategoryForm'
import BrandForm from './components/Admin/BrandForm'
import Cart from './components/Shopps/Cart';

>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/detail/:idproduct" element={<Details/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/search/:search" element={<Home/>} />
<<<<<<< Updated upstream
=======
        <Route exact path="/addCategory" element={<CatForm/>} />
        <Route exact path="/addBrand" element={<BrandForm/>} />
        <Route exact path="/cart" element={<Cart />} />
       
>>>>>>> Stashed changes
      </Routes>
    </div>
  );
}

export default App;
