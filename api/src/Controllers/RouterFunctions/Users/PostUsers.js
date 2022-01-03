const bcrypt = require('bcrypt');
const { User } = require('../../../db')

const PostUsers = async(req, res, next) =>{
    try {
        let { name, lastname, type , email, password, phone} = req.body;
        
        if (!email || !password ) {
            return res.json({created:false, message: "faltan datos para completar"})
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

        console.log("estoy creando un user")

        //compruebo si es true o false mi created
        if (!created) {
            return res.json({
                created:false,
                message: 'Este email ya existe'
            })
        }

        return res.json({created: created, newUser})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    PostUsers
}