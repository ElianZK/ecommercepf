const { User } = require('../../../db');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helpers/jwt');

const CreateUser = async (req, res, next)=>{
    try {
        //type, name, email, password, phone, image, address
        let { type, name, email, password, phone, image, address } = req.body;
        if (!name || !email || !password ) {
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
                name,
                password,
                phone,
                image,
                address
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
    let token = await generarJWT( newUser );

        return res.json({created: created, newUser, token })
    } catch (error) {
        next(error)
    }
}

module.exports={
    CreateUser
}