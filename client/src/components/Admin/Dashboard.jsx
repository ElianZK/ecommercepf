import { Link } from "react-router-dom";
import s from "../../assets/styles/dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={s.container}>
            <div className={s.panel}>
                <div className={s.button}>
                    <Link className={s.link} to="/addCategory">
                        <span class="material-icons-outlined">category</span>
                        <span className={s.bold}>categorías</span>
                    </Link>
                </div>
                <div className={s.button}>
                    <Link className={s.link} to="/addBrand">
                        <span class="material-icons-outlined">category</span>
                        <span className={s.bold}>marcas</span>
                    </Link>
                </div>
                <div className={s.button}>
                    <Link className={s.link} to="/products">
                        <span class="material-icons-outlined">category</span>
                        <span className={s.bold}>productos</span>
                    </Link>
                </div>
                <div className={s.button}>
                    <Link className={s.link} to="/userForm">
                        <span class="material-icons-outlined">category</span>
                        <span className={s.bold}>usuarios</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
