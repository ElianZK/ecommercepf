import {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import { editProduct, getAllProducts, getCategories } from '../../actions/index.js'
import s from '../../assets/styles/Products.module.css'
import s2 from '../../assets/styles/CategoryForm.module.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import imgnotfound from "../../assets/img/notfound.gif";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        return state.productsReducer.allProducts.rows;
    }) 
    const brands = useSelector(state=>state.productsReducer.brands);
    const categories = useSelector(state=>state.productsReducer.categories);
    const [data,setData]= useState({
        name:'',
        price: '',
        stock: '',
        condition: '',
        image:'',
        thumbnail: '',        
    })
    const [images,setImages]=useState([]);
    const [image,setImage]=useState('');
    

    const [search, setSearch] = useState('')
    const [searchres, setSearchres] = useState(null)
    const columns = [
        
        {
            name: 'NOMBRE',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'PRECIO',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'STOCK',
            selector: row => row.stock,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            selector: row => [<abbr title="Editar categoria" key={0}><button className={s2.btnEdit} onClick={()=>editProduct(row)} ><FontAwesomeIcon icon={faEdit}/></button></abbr>/* ,
            <abbr title="Eliminar categoria" key={1}><button className={s2.btnDel}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr> */],
            sortable: false,
        },
    ]
    let editProduct = (data) => {
        alert('edit product'+data.name)    
    }
    useEffect(() => {
        dispatch(getAllProducts(null,true))
        dispatch(getCategories());
    }, [dispatch])

    let handleChange= (e)=>{
        e.preventDefault();
        let name= e.target.name;
        let value= e.target.value;
        
    }
    return (
        <div className={s.Container}>
            <form className={s.Form}>
                <h2 className={s.Title}>Registro de Productos</h2>
                <div className={s.formGroup}>
                    <input id="name" name="name" type="text" placeholder="Type a name"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="price" name="price" type="text" placeholder="Type the price"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="stock" name="stock" type="text" placeholder="Type the Stock"></input>
                </div>
                <div className={s.formGroup}>
                    <select name="condition">
                        <option value="">Select a condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                {/* <div className={s.formDetail}> */}
                <div className={s.formGroup}>
                    <input id="image" name="image" type="text" placeholder="Type an URL image"></input>
                    {/* <button>ADDImage</button> */}
                </div>
                <div className={s.formGroup}>
                    <input id="thumbnail" name="thubnail" type="text" placeholder="Type a small image"></input>
                </div>
                <div className={s.formGroup}>
                    <select name='category' /* onChange={handleChangeCategory} */>
                        <option value=''>Select Category</option>
                        {categories.map(el=>(<option key={el.idCategory} value={el.name}>{el.name}</option>))}
                    </select>
                </div>
                <div className={s.formGroup}>
                <select name='brand' /* onChange={handleChangeFilters} */>
                    <option value=''>Select Brand</option>
                    {brands.map(el=>(<option key={el.idBrand} value={el.name}>{el.name}</option>))}
                </select>
                </div>
                <div className={s.formDetail}>
                    <input id="att" name="att" type="text" placeholder="Ingrese el atributo"></input>
                    <input id="desc" name="desc" type="text" placeholder="Ingrese la descripcion"></input>
                    <button>ADD</button>
                </div>
                <div className={s.formGroup}>
                    <button className={s.button}>Registrar</button>
                </div>
            </form>
            <div className={s.containerSearch}>

            <input name="name" placeholder="Ingrese su busqueda" onChange={(e)=>{
                    let name= e.target.value;
                    setSearch(name)
                    setSearchres(
                        products.filter(p=>{
                            console.log(p)
                            return p.name.includes(name) 
                        })
                    )
                }}/>
            </div>
            <DataTable
                pagination
                columns={columns}
                data={searchres?searchres:products} /**/
            />
        </div>
    )
}

export default Products
