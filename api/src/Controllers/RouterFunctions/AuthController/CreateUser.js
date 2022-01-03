const { User } = require('../../../db');
const bcrypt = require('bcrypt');
//const { generarJWT } = require('../../../helpers/jwt');

const CreateUser = async (req, res, next)=>{
    try {
        let { name, lastname, type , email, password, phone} = req.body;

        console.log(type, email, password, phone)

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
                phone,
                name,
                lastname,
                email
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
        /*let token = await generarJWT( newUser );
        console.log(`token---------->`, token)*/
        
        return res.json({created: created, newUser, token })
    } catch (error) {
        next(error)
    }
}

module.exports={
    CreateUser
}