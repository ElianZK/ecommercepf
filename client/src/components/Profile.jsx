import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions";
import s from "../assets/styles/Profile.module.css";

const Profile = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => {
        return state.usersReducer.loginInfo.user;
    });

    const [mode, setMode] = useState("view");

    const [data, setData] = useState({
        ...user
    })

    const [isConnected, setIsConncted] = useState(false);

    useEffect(() => {
        console.log(user)
        setData({...user})
    }, [user, mode])

    useEffect(() => {
        const {idUser} = JSON.parse(localStorage.getItem("user"));

        console.log(idUser);
        if(idUser == null){
            console.log("no estas conectado")
            setIsConncted(false);
        }else{
            console.log("estas conectado")
            setIsConncted(true);
        }
    }, [])

    return (
        <div className={s.profile}>
            {isConnected ? (<>    
                <div className={s.image}>
                    <img className={s.photo} src={user.image || ""} alt="" />

                    {mode === "view" ? 
                        <button className={s.btn} onClick={() => setMode("edit")}>editar perfil</button> 
                        : 
                        <button className={s.btn} onClick={() => {
                            console.log("voy a updatear al usuario " + user.idUser);
                            console.log("datos a actualizar ", data);
                            dispatch(updateUser(user.idUser, data, "profile"));
                            setMode("view");
                        }}>aceptar cambios</button> 
                    }
                </div>

                <div className={s.data}>
                    <table className={s.table}>
                        <tr>
                            <td><h2 className={s.th}>nombre</h2></td>
                            <td className={s.value}>{mode === "view" ? data.name : <input type="text" value={data.name} onChange={(e) => setData(prev => {
                                return {
                                    ...prev,
                                    name: e.target.value
                                }
                            })}/>}</td>
                        </tr>

                        <tr>
                            <td><h2 className={s.th}>apellido</h2></td>
                            <td className={s.value}>{mode === "view" ? user.lastname : <input type="text" value={data.lastname} onChange={(e) => setData(prev => {
                                return {
                                    ...prev,
                                    lastname: e.target.value
                                }
                            })}/>}</td>
                        </tr>

                        <tr>
                            <td><h2 className={s.th}>email</h2></td>
                            <td className={s.value}>{mode === "view" ? user.email : <input type="text" value={data.email} onChange={(e) => setData(prev => {
                                return {
                                    ...prev,
                                    email: e.target.value
                                }
                            })}/>}</td>
                        </tr>

                        <tr>
                            <td><h2 className={s.th}>telefono</h2></td>
                            <td className={s.value}>{mode === "view" ? user.phone : <input type="text" value={data.phone} onChange={(e) => setData(prev => {
                                return {
                                    ...prev,
                                    phone: e.target.value
                                }
                            })}/>}</td>
                        </tr>

                        <tr>
                            <td><h2 className={s.th}>Domicilio</h2></td>
                            <td className={mode === "view" ? s.value : ""}>
                                {mode === "view" ? (<>
                                    <span>calle</span> | <span>enumeración</span> | <span>código postal</span>
                                </>) : (<>
                                    <input className={s.value} type="text" value="calle"/>
                                    <input className={s.value} type="text" value="enumeración"/>
                                    <input className={s.value} type="text" value="código postal"/>
                                </>)}
                            </td>
                        </tr>
                    </table>
                </div>
            </>) : <h1>no podes ver esta página porque no entrase a tu cuenta</h1>}
        </div>
    )
}

export default Profile;