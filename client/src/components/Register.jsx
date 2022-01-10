import React,{useState, useEffect}  from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearRegisterInfo, createUser, login, loginWithNormalAccount } from '../actions';

import { signInWithGoogle } from '../config/firebase-config';

import Swal from 'sweetalert2';

import s from '../assets/styles/Register.module.css'
// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider } from 'firebase/auth';
import AccountsButtons from './AccountsButtons';

import { getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    GithubAuthProvider, 
    FacebookAuthProvider, 
    setPersistence, 
    browserSessionPersistence,
} from 'firebase/auth';

// localhost:3001/users/CreateUser

function Register() {    
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // mensajitos al faltar un dato al autenticarse
    let initialError={
        name:'Ingresa un nombre',
        lastname:'Ingresa un apellido',
        email:'Ingresa un email valido',
        pass:'Ingresa una contraseña',
        tel:'Ingresa un telefono',
        chterm:'Debe aceptar los terminos y condiciones para continuar con el registro',
    }
    //creo un estado interno data
    let [data,setData] = useState({
        name: '',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        chterm:false,
    })

    let [error,setError] = useState(initialError)

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
            }else{
                Swal.fire({
                    title: "Registro exitoso",
                    text: "Ahora inicie sesión",
                    icon: "success"
                });

                dispatch(clearRegisterInfo());
                navigate("/");
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

    const  validate =(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        let errort='';
        
        if((name==='name' || name==='lastname') && value && !/[a-zA-Záéíóú ]+$/.test(value)){
            errort='Solo se admiten letras.'
        }/*else if(name==='email' && value && /\S+@\S+\.\S+/.test(value)){
            errort='Correo no válido';
        }*/else if(name==='chterm' && data.chterm){
            value=!data.chterm;
            errort='Debe aceptar los terminos y condiciones para continuar'
        } else if(value==='' && name!=='chterm'){
            errort='Ingresa un valor para continuar'
        }

        setData({
            ...data,
            [name]: name !== 'chterm' ? value: !data.chterm
        })

        setError({...error, [name]: errort});
    }

    const onSubmit = e => {
        e.preventDefault();
        //const auth = getAuth();                
        const {name, lastname, email, password, phone} = data;
        dispatch(createUser({
            type:"user", 
            email, 
            password, 
            phone,
            name,
            lastname
        }));
        /*createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            console.log(userCredential);
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        
            console.log(errorCode);

            setAuthError(errorCode.split("/")[1]);
        });*/
    }
    const mkLogin= async (e,type)=>{
        e.preventDefault();
                
        let provider;
        
        if(type==='google') provider = new GoogleAuthProvider();
        else if(type==='github') provider = new GithubAuthProvider();
        else if(type==='facebook') provider = new FacebookAuthProvider();
        
        console.log("la sesión es de " + type)

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

                console.log(res.user);

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
            <p><strong><i>Registrate y disfrutarás de una gran experiencia de compra</i></strong></p>
            <form className={s.form} onSubmit={e => {
                e.preventDefault();
                const {name, lastname, email, password, phone} = data;

                dispatch(createUser({
                    type:"user", 
                    email, 
                    password, 
                    phone,
                    name,
                    lastname
                }));
            }}>
                <div className={s.formGroup}>
                    <label htmlFor="name">Nombre</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => validate(e)}
                    placeholder="Nombre"
                    />
                    {error.name?<span className={s.error}>{error.name}</span>:null}
                </div>

                <div className={s.formGroup}>
                    <label htmlFor="lastname">Apellidos</label>
                    <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={data.lastname}
                    onChange={(e) => validate(e)}
                    placeholder="Apellidos"
                    />
                    {error.lastname?<span className={s.error}>{error.lastname}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => validate(e)}
                    placeholder="Email"
                    />
                    {error.email?<span className={s.error}>{error.email}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="pass">Contraseña</label>
                    <input
                    type="password"
                    id="pass"
                    name="password"
                    value={data.pass}
                    onChange={(e) => validate(e)}
                    placeholder="Contraseña"
                    />
                    {error.pass?<span className={s.error}>{error.pass}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="tel">Telefono</label>
                    <input
                    type="tel"
                    id="tel"
                    name="phone"
                    value={data.tel}
                    onChange={(e) => validate(e)}
                    placeholder="Telefono"
                    />
                    {error.tel?<span className={s.error}>{error.tel}</span>:null}
                </div>
                <div className={s.formGroup}>
                    <div className={s.formGTerm}>
                        <label htmlFor="chterm">
                        <input
                        type="checkbox"
                        id="chterm"
                        name="chterm"
                        value=""
                        onChange={(e) => validate(e)}
                        />Acepto los terminos y condiciones</label>
                    </div>
                    {error.chterm?<span className={s.error}>{error.chterm}</span>:null}
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
