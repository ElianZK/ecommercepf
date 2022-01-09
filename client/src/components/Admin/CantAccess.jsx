import s from "../../assets/styles/error.module.css";

const CantAccess = () => {
    return (
        <div className={s.container}>
            <h1 className={s.text}>no tienes acceso a esta página</h1>
        </div>
    )
}

export default CantAccess;