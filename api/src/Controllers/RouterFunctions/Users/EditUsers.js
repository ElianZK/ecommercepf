const { User } = require('../../../db');

const EditUsers = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const { name, type, email, password, phone } = req.body;   

        console.log("recibí ", {type, email, password, phone})

        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                message:"No existe un Usuario con el id"+id
            })
        };
        await usuario.update({type, name, email, password, phone});
        res.json(usuario);
        res.json({});
    } catch (error) {
        next(error)
    }
}

module.exports={
    EditUsers
}