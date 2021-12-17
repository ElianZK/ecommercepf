import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import s from "../assets/styles/login.module.css";
import googleIcon from "../assets/img/google.png";
import githubIcon from "../assets/img/github.png";
//import { login } from "../actions";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const auth = getAuth();
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [login, setLogin] = useState(false)

    const extLoginGoogle= async (e)=>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider)
           .then((userCredential) => {
            const userdat = userCredential.user;
            console.log(userdat)
            //setUser({...userdat,account:'google'})
            setLogin(true)
          })
          .catch((error) => {
            console.log('error '+error)
          });
      }

    return (
        <div className={s.container}>
            <div className={s.wrapLogin}>
                {!login?<form className={s.form} >
                    <h2 className={s.title}>Login</h2>
                    <div className={s.formGroup}>
                        <input 
                            onChange={e => setInputs(prev => {
                                return{
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }
                            })} 
                            className={s.input} 
                            name="email" 
                            value={inputs.email}
                            type="email"
                            placeholder="Email"
                        />
                        <FontAwesomeIcon className={s.iconInput} icon={faEnvelope}/>
                    </div>
                    <div className={s.formGroup}>
                        <input 
                            onChange={e => setInputs(prev => {
                                return{
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }
                            })} 
                            className={s.input} 
                            name="password"
                            value={inputs.password} 
                            type="password" 
                            placeholder="Contraseña"
                        />
                        <FontAwesomeIcon className={s.iconInput} icon={faLock}/>
                        
                    </div>
                    <Link className={s.link} to="/reset_pass">¿Olvidaste tu contraseña?</Link>
                <div className={s.containerbuttons}>
                    <button name="loginWithGoogle" className={`${s.firstbtn} ${s.alternativeSubmit}`} onClick={extLoginGoogle}>
                        <img className={s.icon} src={googleIcon} alt="icono"/>
                    </button>

                    
                    {/* <button name="loginWithGithub" className={s.alternativeSubmit} type="submit">
                        <img className={s.icon} src={githubIcon} alt="icono"/>
                    </button> */}
                    </div>
                    {/* <button name="login" className={`${s.normalSubmit} ${s.btnText}`} type="submit">Ingresar</button> */}

                    <Link className={s.link} to="/register">Si no tenes cuenta, create una aquí</Link>
                </form>:<button >Log out</button>}
            </div>
        </div>
    )
}

export default Login