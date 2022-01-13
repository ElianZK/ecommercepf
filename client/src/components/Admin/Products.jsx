import {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import { createProduct, editProduct, getAllProducts, getCategories, getBrands } from '../../actions/index.js'
import s from '../../assets/styles/Products.module.css'
import s2 from '../../assets/styles/CategoryForm.module.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        return state.productsReducer.allProducts.rows;
    }) 
    const [edit,setEdit] =useState(false)
    const brands = useSelector(state=>state.productsReducer.brands);
    const categories = useSelector(state=>state.productsReducer.categories);
    const initialState={
        name:'',
        price: '',
        stock: '',
        condition: '',
        image:'',
        thumbnail: '',
        attributes:[],
        brands:'',
        categories: [],       
    }
    const [data,setData]= useState(initialState)
    const [attrib,setAtrrib]=useState({
        name:'',
        value:''
    })
    /* const [images,setImages]=useState([]);
    const [image,setImage]=useState(''); */
    

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
            selector: row => [<abbr title="Editar producto" key={0}><button className={s2.btnEdit} onClick={()=>editProduct(row)} ><FontAwesomeIcon icon={faEdit}/></button></abbr>/* ,
            <abbr title="Eliminar categoria" key={1}><button className={s2.btnDel}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr> */],
            sortable: false,
        },
    ]
    let editProduct = (data) => {
        alert('edit product'+data.name)    
        console.log(data)
    }
    useEffect(() => {
        dispatch(getAllProducts(null,true))
        dispatch(getCategories());
        dispatch(getBrands())
    }, [dispatch])

    let handleChange= (e)=>{
        e.preventDefault();
        let name= e.target.name;
        let value= e.target.value;
        if(name==='category'){
            if(!data.categories.find(c=>c===value)){
                setData({
                    ...data,
                    categories: [...data.categories,value]
                })
            }
        }else {
            setData({
                ...data,
                [name]: value
            })
        }
    }

    let handleAtt= (e)=>{
        e.preventDefault();
        let name= e.target.name;
        let value= e.target.value;
        setAtrrib({
            ...attrib,
            [name]: value
        })
    }
    let addDetail = (e)=>{
        e.preventDefault();
        setData({
            ...data,
            attributes: [...data.attributes,attrib]
        })
        setAtrrib({
            name:'',
            value:''
        })
    }

    let handlerRegister = (e)=>{
        e.preventDefault()
        dispatch(createProduct(data))
        Swal.fire({
            icon: 'success',
            text: 'Producto Registrado Correctamente!',
            showConfirmButton: false,
            timer: 3000
          })
    }
    return (
        <div className={s.Container}>
            <form className={s.Form}>
                <h2 className={s.Title}>Registro de Productos</h2>
                <div className={s.formGroup}>
                    <input id="name" name="name" type="text" placeholder="Type a name" onChange={handleChange}/>
                </div>
                <div className={s.formGroup}>
                    <input id="price" name="price" type="text" placeholder="Type the price" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                    <input id="stock" name="stock" type="text" placeholder="Type the Stock" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                    <select name="condition" onChange={handleChange}>
                        <option value="">Select a condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                {/* <div className={s.formDetail}> */}
                <div className={s.formGroup}>
                    <input id="image" name="image" type="text" placeholder="Type an URL image" onChange={handleChange}></input>
                    {/* <button>ADDImage</button> */}
                </div>
                <div className={s.formGroup}>
                    <input id="thumbnail" name="thumbnail" type="text" placeholder="Type a small image" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                    <select name='category' onChange={handleChange}>
                        <option value=''>Select Category</option>
                        {categories.map(el=>(<option key={el.idCategory} value={el.name}>{el.name}</option>))}
                    </select>
                </div>
                <div className={s.formGroup}>
                <select name='brands' onChange={handleChange}>
                    <option value=''>Select Brand</option>
                    {brands.map(el=>(<option key={el.idBrand} value={el.name}>{el.name}</option>))}
                </select>
                </div>
                <div className={s.formDetail}>
                    <input id="att" name="name" type="text" value={attrib.name} placeholder="Attribute" onChange={handleAtt}></input>
                    <input id="desc" name="value" type="text" value={attrib.value} placeholder="Description" onChange={handleAtt}></input>
                    <button onClick={addDetail}>ADD</button>
                </div>
                <div className={s.formGroup}>
                    <button className={s.button} onClick={handlerRegister}>Registrar</button>
                </div>
            </form>
            <div className={s.containerSearch}>
            <button className={s.button} onClick={handlerRegister}>Registrar Nuevo Producto</button>
            <input name="name" placeholder="Ingrese su busqueda" onChange={(e)=>{
                    let name= e.target.value;
                    setSearch(name)
                    setSearchres(
                        products.filter(p=>{
                            console.log(p)
                            return p.name.toLowerCase().includes(name.toLowerCase()) 
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
