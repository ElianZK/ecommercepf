import s from "../assets/styles/error.module.css";

const Error = () => {
    return (
        <div className={s.container}>
            <h1 className={s.text}>La página a la que quiere acceder no existe</h1>
        </div>
    )
}

export default Error
