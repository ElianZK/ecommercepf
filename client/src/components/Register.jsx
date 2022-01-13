import React,{useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearRegisterInfo, createUser } from '../actions';

import Swal from 'sweetalert2';

import s from '../assets/styles/Register.module.css'
// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider } from 'firebase/auth';
import AccountsButtons from './AccountsButtons';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";




import { getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    GithubAuthProvider, 
    FacebookAuthProvider, 
    setPersistence, 
    browserSessionPersistence,
} from 'firebase/auth';

// localhost:3001/users/CreateUser
//PW: var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g

//?[Function to validate error:
function validate(input){
  let err = {};
  //*Validate name
  if(input.name===''){
    err.name = "Ingresa un nombre";
  }else if(!input.name.match(/^[^*|\":<>[\]{}`\\()';.!¡@&$\[0-9]+$/) && input.name!==''){
    err.name = "Ingrese solo letras mayúsculas o minúsculas."
  }
    //*Validate lastname
  if(input.lastname===''){
    err.lastname = "Ingresa un apellido";
  }else if(!input.lastname.match(/^[^*|\":<>[\]{}`\\()';.!¡@&$\[0-9]+$/) && input.lastname!==''){
    err.lastname = "Ingrese solo letras mayúsculas o minúsculas."
  }
  //*Validate other inputs
  if(input.email === ""){
    err.email= "Ingresa un email";
  }else if(!isEmail(input.email) && input.mail!=='e'){
    err.email="Ingresa un email válido"
  }
  if(input.password ===""){
    err.password = "Ingrese una contraseña válida";
  }else if(!input.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/g) && input.password!==''){
    err.password = "La contraseña debe contener mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 caracter especial (!@#$%^&*)";

  }
  if(input.phone !== ""){
    if(!input.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
      err.phone = "Ingrese un formato válido: Ej: +54 1155264083 / 1155264083"
    }
  }
  if(input.chterm === false){
    err.chterm = "Debe aceptar los terminos y condiciones para continuar con el registro";
  }
  return err;
}

function isEmail(email){
  let reg = new RegExp(/^[a-zA-Z0-9.\-+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  return email.match(reg);
}
function Register() {    
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //?|Para mostrar la contraseña
    const [passwordShown, setPasswordShown] = useState(false);
    //?|Para que se cambie la visibilidad:
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
    //[creo un estado interno de los datos del formulario
    let [data,setData] = useState({
        name: '',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        chterm:false,
    })
    //[Estado para saber si presioné el botón y debo mostrar los errores o no.
    let [submitted, setSubmitted] = useState(false);
    //[Estado de los errores
    let [error,setError] = useState({})

    //[Actualizo el error luego del cambio de estado
    useEffect(()=>{
      setError(validate(data))
    },[data])
    
    //[Actualizo data con cada ingreso de info del usuario
    const handleChange = (event)=>{
      setData({
        ...data,
        [event.target.name]: event.target.value
      })
    };
    //[Función para cuando presiono "REGISTRAR", acá valido y si hay errores los muestro, si no, despacho la creación del usuario.
    function handleSubmit(event){
      event.preventDefault();
      //Si no tengo errores, entonces despacho la acción.
      if(!Object.keys(error).length){
        dispatch(createUser({
          type:"user", 
          ...data
      }));
        setSubmitted(false);
      }else{
        //si no, cambio submitted a true y muestro los campos con errores
        Swal.fire({
          title: "Error",
          text: "Complete los campos",
          icon: "error"
        })
        setSubmitted(true);
      }
    }
    //[Función para cuando aprieten enter que intente ingresar el formulario:
    const handleKeyDown = (e)=>{
      //! console.log(e.keyCode); // 13 return 
      if (e.keyCode === 13){
        handleSubmit(e);
      }
    }

    // define que tipo de error hay al autenticarse
    const [AuthError, setAuthError] = useState("");
    const registerInfo = useSelector(state => state.usersReducer.registerInfo);

    useEffect(() => {
        if(registerInfo !== null){
            if(registerInfo.error === true){
                Swal.fire({
                    title: "error",
                    text: "Revise los datos",
                    icon: "error"
                })
            }else if(registerInfo.created === false){
                Swal.fire({
                    title: registerInfo.message,
                    text: "Cree una cuenta con otro email",
                    icon: "info"
                })
                setData({...data, email:""});
            }else{
                Swal.fire({
                    title: "Registro exitoso",
                    text: "Ahora inicie sesión",
                    icon: "success"
                });

                dispatch(clearRegisterInfo());
                navigate("/login");
            }
        }
    }, [registerInfo])

    // mensajes de alerta al autenticarse
    const errorMessages={
        "invalid-email": {title: "Email inválido", text: "Por favor ingrese un email válido"},
        "missing-email": {title: "Email Vacío", text: "El Email no puede quedar vacío"},
        "internal-error": {title: "Error", text: "Es posible que falten datos"},
        "weak-password": {title: "Contraseña debil", text: "Ingrese otra contraseña"},
        "email-already-in-use": {title: "Email en Uso", text:"Ingrese un nuevo Email"}
    }

    useEffect(() => {
        if(AuthError){
            Swal.fire({
                ...errorMessages[AuthError],
                icon: "error"
            }).then(res => {
                if(res.isConfirmed){
                    setAuthError("")
                }
            })
        }
    }, [AuthError])

    
    const mkLogin= async (e,type)=>{
        e.preventDefault();
                
        let provider;
        
        if(type==='google') provider = new GoogleAuthProvider();
        else if(type==='github') provider = new GithubAuthProvider();
        else if(type==='facebook') provider = new FacebookAuthProvider();
        
        //!console.log("la sesión es de " + type)

        setPersistence(auth, browserSessionPersistence)
        .then(async ()=>{
            return signInWithPopup(auth, provider).then(res=>{
                let data = {
                    token: res.user.accessToken,
                    stsTokenManager: res.user.stsTokenManager,
                    uid: res.user.uid,
                    isVerified: res.user.emailVerified,
                    idUser: res.user.uid,
                    name: res.user.displayName.split(" ")[0],
                    lastName: res.user.displayName.split(" ")[1],
                    photo: res.user.photoURL,
                    email: res.user.email
                };

                //!console.log(res.user);

                dispatch(createUser({
                    idUser: data.idUser,
                    type:"user", 
                    email: data.email, 
                    password: "-", 
                    phone: "-",
                    name: data.name,
                    lastname: data.lastName,
                    photo: data.photo
                }));


            })
        }).catch((error) => {
            Swal.fire({
                title:'Error al iniciar sesión',
                text: error.message,
                icon: 'error'
            })
        });
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>Formulario de Registro</h2>
            <p><strong><i>Registrate para acceder a las últimas tendencias en tecnología</i></strong></p>
            <form className={s.form} onSubmit={e => handleSubmit(e) } onKeyDown={e=>{handleKeyDown(e)}}>
                <div className={s.formGroup}>
                    <label htmlFor="name">Nombre</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="Nombre"
                    />
                    {(submitted && error.name)?<span className={s.error}>{error.name}</span>:null}
                </div>

                <div className={s.formGroup}>
                    <label htmlFor="lastname">Apellidos</label>
                    <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={data.lastname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Apellidos"
                    />
                    {(submitted && error.lastname)?<span className={s.error}>{error.lastname}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                    />
                    {(submitted && error.email)?<span className={s.error}>{error.email}</span>:null}
                </div>
                <div className={`${s.formGroup}` }>
                    <label htmlFor="pass">Contraseña</label>
                    <div className={s.password}>

                    <input
                    type={passwordShown?"text":"password"}
                    id="pass"
                    name="password"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Contraseña"
                    />
                    <i onClick={togglePasswordVisiblity}><FontAwesomeIcon icon={faEye} /></i>
                    </div>
                    {(submitted && error.password)?<span className={s.error}>{error.password}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="tel">Telefono</label>
                    <input
                    type="tel"
                    id="tel"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => handleChange(e)}
                    placeholder="Telefono"
                    />
                    {(submitted && error.phone)?<span className={s.error}>{error.phone}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <div className={s.formGTerm}>
                        <label htmlFor="chterm">
                        <input
                        type="checkbox"
                        id="chterm"
                        name="chterm"
                        value=""
                        onChange={(e) => handleChange(e)}
                        />Acepto los terminos y condiciones</label>
                    </div>
                    {(submitted && error.chterm)?<span className={s.error}>{error.chterm}</span>:null}
                </div>

                <AccountsButtons access={mkLogin}/>

                <div className={s.formGroup}>
                    <button className={s.btn} type="submit" >Registrarse</button>
                </div>
            </form>
        </div>
    )
}

export default Register
