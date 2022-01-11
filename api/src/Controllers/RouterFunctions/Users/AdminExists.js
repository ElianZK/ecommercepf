const bcrypt = require('bcrypt');
const { User } = require('../../../db')

const AdminExists = async(req, res, next) =>{
    try {
        let [newUser, created] = await User.findOrCreate({
            where:{ email: "admin@gmail.com" },
            defaults:{
                type: "admin",
                password: "admin123",
                phone: "-",
                name: "admin",
                lastname: "admin",
                email: "admin@gmail.com"
            }
        });

        //compruebo si es true o false mi created
        if (!created) {
            return res.json({
                message: 'Ya existe, no hace falta crear'
            });
        }else{
            return res.json({
                message: 'Ya se creó'
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    AdminExists
}