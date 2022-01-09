const bcrypt = require('bcrypt');
const { User } = require('../../../db')

const PostUsers = async(req, res, next) =>{
    try {
        let { idUser, name, lastname, type , email, password, phone, photo, from} = req.body;

        if (!email || !password ) {
            return res.json({created:false, message: "faltan datos para completar"})
        }

        //encriptar el password
        // TODO: antes de implementar hasheo, hay que averiguar como deshashear
        // let salt = bcrypt.genSaltSync();
        // password = bcrypt.hashSync(password, salt);

        //guardar en la base da datos
        let [newUser, created] = await User.findOrCreate({
            where:{ email },
            defaults:{
                idUser,
                type,
                password,
                phone,
                name,
                lastname,
                email,
                image: photo
            }
        });

        //compruebo si es true o false mi created
        if (!created) {
            return res.json({
                created:false,
                message: 'Este email ya existe'
            });
        }

        if(from === "admin"){
            const users = await User.findAll()

            console.log(users);

            return res.json(users);
        }else{
            return res.json({created: created, newUser});
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    PostUsers
}