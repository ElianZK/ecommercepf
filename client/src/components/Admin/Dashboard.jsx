import { Link } from "react-router-dom";
import s from "../../assets/styles/dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={s.container}>
            <div className={s.panel}>
                <Link className={s.link} to="/addCategory">
                    <div className={s.button}>
                        {/* acá va el icono */}
                        <span className={s.bold}>categorías</span>
                    </div>
                </Link>
                <Link className={s.link} to="/addBrand">
                    <div className={s.button}>
                        {/* acá va el icono */}
                        <span className={s.bold}>marcas</span>
                    </div>
                </Link>
                <Link className={s.link} to="/products">
                    <div className={s.button}>
                        {/* acá va el icono */}
                        <span className={s.bold}>productos</span>
                    </div>
                </Link>
                <Link className={s.link} to="/userForm">
                    <div className={s.button}>
                        {/* acá va el icono */}
                        <span className={s.bold}>usuarios</span>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Dashboard
