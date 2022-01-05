import googleIcon from "../assets/img/google.png";
import githubIcon from "../assets/img/github.png";
import facebookIcon from "../assets/img/facebook.png";

import s from "../assets/styles/login.module.css";

const accountsButtons = () => {
    return (
        <div className={s.containerbuttons}>
            <button name="loginWithGoogle" className={`${s.firstbtn} ${s.alternativeSubmit}`} onClick={(e)=>mkLogin(e,'google')}>
                <img className={s.icon} src={googleIcon} alt="icono"/>
            </button>

            
            <button name="loginWithGithub" className={s.alternativeSubmit} type="submit">
                <img className={s.icon} src={githubIcon} alt="icono"/>
            </button>

            <button name="loginWithFB" className={s.alternativeSubmit} type="submit">
                <img className={s.icon} src={facebookIcon} alt="icono"/>
            </button>
        </div>
    )
}

export default accountsButtons
