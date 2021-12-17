const { User } = require('../../../db');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helpers/jwt');

const CreateUser = async (req, res, next)=>{
    try {
        let { type , email, password, phone} = req.body;
        if (!email || !password ) {
            return res.json("faltan datos para completar")
        }
        //encriptar el password
        let salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);
        //guardar en la base da datos
    
        let [newUser, created] = await User.findOrCreate({
            where:{ email },
            defaults:{
                type,
                password,
                phone
            }
        });
        //compruebo si es true o false mi created
    if (!created) {
        return res.json({
            ok:false,
            message: 'Este email ya existe'
        })
    }
        //genero mi JWT
    // let token = await generarJWT( newUser.idUser, newUser.email );
        return res.json({created: created, newUser })
    } catch (error) {
        next(error)
    }
}

module.exports={
    CreateUser
}