import googleIcon from "../assets/img/google.png";
import githubIcon from "../assets/img/github.png";
import facebookIcon from "../assets/img/facebook.png";

import s from "../assets/styles/login.module.css";

const AccountsButtons = ({access}) => {
    return (
        <div className={s.containerbuttons}>
            <button name="loginWithGoogle" className={`${s.firstbtn} ${s.alternativeSubmit}`} onClick={(e)=>access(e,'google')}>
                <img className={s.icon} src={googleIcon} alt="icono"/>
            </button>

            
            <button name="loginWithGithub" className={s.alternativeSubmit} onClick={(e) => access(e,'github')}>
                <img className={s.icon} src={githubIcon} alt="icono"/>
            </button>

            <button name="loginWithFB" className={s.alternativeSubmit} onClick={(e) => access(e,'facebook')}>
                <img className={s.icon} src={facebookIcon} alt="icono"/>
            </button>
        </div>
    ) 
}

export default AccountsButtons
