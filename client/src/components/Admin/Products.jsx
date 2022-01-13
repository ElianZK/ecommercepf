import {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux';
import { createProduct, editProduct, getAllProducts, getCategories, getBrands } from '../../actions/index.js'
import s from '../../assets/styles/Products.module.css'
import s2 from '../../assets/styles/CategoryForm.module.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";


function isURL(str) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return  url.test(str);
}


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        return state.productsReducer.allProducts.rows;
    }) 
    const brands = useSelector(state=>state.productsReducer.brands);
    const categories = useSelector(state=>state.productsReducer.categories);
    const initialState={
      name:'',
      price: '',
      stock: '',
      condition: '',
      image:[''],
      thumbnail: '',
      attributes:[{name:"", value:""}],
      brands:'',
      categories: [],       
    }
    //[Estado para la longitud del arreglo de imágenes, y para agregar más imágenes. Igual para atributos
    const [imgLength, setImgLength] = useState(1);
    const [attrLength, setAttrLength] = useState(1);
    //[Edit: hace aparecer el boton cancelar 
    //TODO: NO ANDA EL BOTón CANCELAR. -Swap erróneo -No desaparece.
    const [edit,setEdit] =useState(false)
    const [data,setData]= useState(initialState)


    const [search, setSearch] = useState('')
    const [searchres, setSearchres] = useState(null)
    const columns = [
        {name: 'NOMBRE', selector: row => row.name, sortable: true,},
        {name: 'PRECIO',selector: row => row.price,sortable: true,},
        {name: 'STOCK',selector: row => row.stock,sortable: true,},
        {name: 
          'ACCIONES', 
          selector: 
            row => [
              <abbr 
                title="Editar producto" 
                key={0}
              >
                <button 
                  className={s2.btnEdit} 
                  onClick={()=>EditProduct(row)} 
                >
                  <FontAwesomeIcon icon={faEdit}/>
                </button>
              </abbr>,/* , 
              <abbr title="Eliminar categoria" key={1}><button className={s2.btnDel}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr> */
              <abbr title="Eliminar categoria" key={1}><button onClick={e=>{console.log(data)}}className={s2.btnDel}><FontAwesomeIcon icon={faTrashAlt}/></button></abbr> 
            ],
          sortable: false,},
    ]
    
    //|Manejo el cambio agregado de imágenes:
    const addImageInput = (e)=>{
      setImgLength(imgLength+1);
      setData({
        ...data,
        image: data.image.concat([""])
      })
    }
    //|Handle Change de la imagen 
    //TODO: No tengo que hacer nada acá. No utilizo el valor hasta la validación.
    let handleImageChange= (event, index)=>{
      setData({
        ...data,
        image:[...data.image.map((el, i)=>{
          if(i===index){
            return event.target.value;
          }
          return el
        })]
      })
  }

    let imageRows =[];
    for(let i=0;i<imgLength;i++){
      imageRows.push(
        <input 
          key={i} 
          id="image" 
          name={`image`}
          type="text" 
          value={edit?`${data.image[i]}`:undefined}  
          placeholder="Type an URL image" 
          onChange={e=>handleImageChange(e, i)}
        >
        </input>
      );
    }
    //[Agregado de atributos
    let addAttrInfo = (e)=>{
    setAttrLength(attrLength+1)
    setData({
      ...data,
      attributes: data.attributes.concat([{name:"", value:""}])
    })
  }

    //[Manejo de Atributos
    let handleAttChange= (event, index)=>{
      setData({
        ...data,
        attributes:[...data.attributes.map((el, i)=>{
          if(i===index){
            return {
              ...el,
              [event.target.name]:event.target.value
            };
          }
          return el
        })]
      })
  }

    let attrRows=[];
    for(let i=0; i<attrLength;i++){
      attrRows.push(
        <div>
          <input id="att" name="name" type="text" value={edit?`${data.attributes[i].name}`:undefined} placeholder="Attribute" onChange={e=>handleAttChange(e,i)}></input>
          <input id="desc" name="value" type="text" value={edit?`${data.attributes[i].value}`:undefined} placeholder="Description" onChange={e=>handleAttChange(e,i)}></input>
        </div>
      )
    }
    //TODO: AL momento de pushear, valido que sea un arreglo y que solo mande los elementos que son links y los links que pasan la fución.


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




    let handlerRegister = (e)=>{
      console.log("UPDATE:product")
        e.preventDefault()
        dispatch(createProduct(data))
        Swal.fire({
            icon: 'success',
            text: 'Producto Registrado Correctamente!',
            showConfirmButton: false,
            timer: 3000
          })
    }
    let handleUpdate = (e)=>{
      console.log("EDIT PRODUCT: ROW: ");
      console.log("UPDATE:product")
      e.preventDefault()
      dispatch(editProduct(data))
      Swal.fire({
          icon: 'success',
          text: 'Producto Registrado Correctamente!',
          showConfirmButton: false,
          timer: 3000
        })
  }
    let EditProduct = (row) => {
      console.log("EDIT PRODUCT: ROW: ",row);
      setImgLength(row.image.length);
      setAttrLength(row.attributes.length);
      setData(row);
      setEdit(true);
    }
    let cancelEdit = ()=>{
        setEdit(false);
        setData(initialState)
    }
    return (
        <div className={s.Container}>
            <form className={s.Form}>
                <h2 className={s.Title}>Registro de Productos</h2>
                <div className={s.formGroup}>
                    <input id="name" name="name" type="text" value={data.name} placeholder="Type a name" onChange={handleChange}/>
                </div>
                <div className={s.formGroup}>
                    <input id="price" name="price" type="text" value={data.price} placeholder="Type the price" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                    <input id="stock" name="stock" type="text" value={data.stock} placeholder="Type the Stock" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                  {edit?
                   ( 
                    <select name="condition" onChange={handleChange}>
                      <option key={0} value={data.condition}>{data.condition}</option>
                      <option key={1} value={(data.condition==="new")?"used":"new"}>{(data.condition==="new")?"used":"new"}</option>
                    </select>)
                  :
                    (
                      <select name="condition" onChange={handleChange}>
                        <option key={2} value="">Select a condition</option>
                        <option key={3} value="new">New</option>
                        <option key={4}  value="used">Used</option>
                      </select>
                    )
                  }
                
                </div>
                {/* <div className={s.formDetail}> */}
                <div className={`${s.formGroup}`}>
                  <div className={` ${s.imagesContainer}`}>

                    {imageRows}
                  </div>
                    {/* <input id="image" name="image" type="text"  placeholder="Type an URL image" onChange={handleChange}></input> */}
                    {/* <button>ADDImage</button> */}
                    <i onClick={e=>addImageInput(e)} className={`${s2.btnEdit} ${s.sumbtn}`} ><FontAwesomeIcon icon={faPlus}/></i>
                </div>
                <div className={s.formGroup}>
                    <input id="thumbnail" name="thumbnail" type="text" value={data.thumbnail} placeholder="Type a small image" onChange={handleChange}></input>
                </div>
                <div className={s.formGroup}>
                {edit?
                   ( 
                    <select name="category" onChange={handleChange}>
                      <option key={0} value={data.category}>{data.category}</option>
                      {categories.map((elem, ind)=>{
                        if(elem.name===data.category) return;
                        return(<option key={ind} value={elem.name}>{elem.name}</option>)
                      })}
                    </select>)
                  :
                    (
                      <select name='category' onChange={handleChange}>
                        <option value=''>Select Category</option>
                        {categories.map(el=>(<option key={el.idCategory+"a"} value={el.name}>{el.name}</option>))}
                    </select>
                    )
                  }
                </div>
                <div className={s.formGroup}>
                {edit?
                  ( 
                    <select name="brands" onChange={handleChange}>
                      <option key={0} value={data.brand}>{data.brand}</option>
                      {brands.map((elem, ind)=>{
                        if(elem.name===data.brand) return;
                        return(<option key={ind} value={elem.name}>{elem.name}</option>)
                      })}
                    </select>
                  ) 
                  :
                    (
                      <select name='brands' onChange={handleChange}>
                        <option value=''>Select Brand</option>
                        {brands.map(el=>(<option key={el.idBrand+"a"} value={el.name}>{el.name}</option>))}
                      </select>
                    )
                  

                }
                </div>

                <div className={`${s.formDetail}`}>
                  <div className={s.attrContainer}>
                    {attrRows}
                  </div>
                    <i onClick={e=>addAttrInfo(e)} className={`${s2.btnEdit} ${s.sumbtn}`} ><FontAwesomeIcon icon={faPlus}/></i>
                </div>



                <div className={s.formGroup}>
                    <button className={s.button} onClick={edit?handleUpdate:handlerRegister}>{edit?'Actualizar':'Registrar'}</button>
                </div>
                {edit?<div className={s.formGroup}>
                    <button className={s.button} onClick={handlerRegister}>Cancelar</button>
                </div>:null}
            </form>
            <div className={s.containerSearch}>
            <button className={s.button} onClick={()=>cancelEdit}>Registrar Nuevo Producto</button>
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
