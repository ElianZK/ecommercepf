import {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import { editProduct, getAllProducts } from '../../actions/index.js'
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
    const [data,setData]= useState([])
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [stock,setStock]=useState('');
    const [condition,setCondition]=useState('');
    const [images,setImages]=useState([]);
    const [image,setImage]=useState('');
    const [thumbnail,setThumbnail]=useState('');
    

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
    }, [dispatch])
    return (
        <div className={s.Container}>
            {/* <div className={s.modal}>
                <form className={s.editProd}>
                    <div>
                        <div className={s.formGroup}>


                        </div>
                        <div className={s.formGroup}>

                        </div>
                        <div className={s.formGroup}>

                        </div>
                        <div className={s.formGroup}>

                        </div>
                        <div className={s.formGroup}>

                        </div>
                        <div className={s.formGroup}>

                        </div>
                        <div className={s.formGroup}>

                        </div>
                    </div>

                </form>

            </div> */}
            <form className={s.Form}>
                <h2 className={s.Title}>Registro de Productos</h2>
                <div className={s.formGroup}>
                    <input id="name" name="name" type="text" placeholder="Ingrese el nombre"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="price" name="price" type="text" placeholder="Ingrese el precio"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="stock" name="stock" type="text" placeholder="Ingrese el Stock"></input>
                </div>
                <div className={s.formGroup}>
                    <select name="condition">
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                <div className={s.formDetail}>
                    <input id="image" name="image" type="text" placeholder="Ingrese la imagen"></input>
                    <button>ADDImage</button>
                </div>
                <div className={s.formGroup}>
                    <input id="thumbnail" name="thubnail" type="text" placeholder="Ingrese un thubnail"></input>
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
