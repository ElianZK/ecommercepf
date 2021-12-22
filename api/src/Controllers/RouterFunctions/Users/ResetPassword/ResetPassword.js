const { User } = require('../../../../db');
const bcrypt = require('bcrypt');

const ResetPassword = async (req, res, next)=>{
    try {
        
        let { id } = req.params;
        let { password } = req.body;

        let usuario = await User.findByPk(id);
        
        // si no hay usuario, devuelve un error
        if (!usuario) {
            res.status(404).json({message:'No pudimos encontrar una coincidencia para este enlace'})
        }
        // de lo contrario, necesitamos aplicar un hash a la nueva contraseña antes de guardarla en la base de datos
        let salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);
        //actualizo mi password usuario
        await usuario.update({password});

        res.status(200).json({message:'Password updated | Password Actualizado'})
    } catch (error) {
        next(error)
    }
}

module.exports={
    ResetPassword
}