const { User } = require('../../../db');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helpers/jwt');

const  LoginUser = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        console.log(`email`, email)
        const user = await User.findOne({
            where:{email}
        });
        if (!user) {
            return res.json({
                ok:false,
                message:'No existe Usuario con ese Email registrado'
            })
        }
        // validar password
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.json({
                ok:false,
                message:'Password incorrecta'
            })
        }

        // genero JWT
        // const token = await generarJWT(user.idUser)
        res.json({
            ok:true,
            message:'ingreso',
            uid:user.idUser,
            email: user.email,
            password:user.password,
            // token
        })
    } catch (error) {
        next(error)
    }
}
module.exports={
    LoginUser
}

// useEffect(() => {
    
//     onAuthStateChange(auth, (user)=>{
//         if(user?.uid){
//             const datos = {
//                 uid:user.uid,
//                 name:user.displayName,
//             }
//             dispatch(login(datos));
//             setIsLoggedIn(true)            
//         } else if(authGoo.logNormal && authGoo.logNormal.ok){
//             setIsLoggedIn(true)
//         } else {
//             setIsLoggedIn(false)
//         }
//     })
// }, [dispatch])