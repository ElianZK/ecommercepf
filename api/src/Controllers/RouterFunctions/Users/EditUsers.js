const { User } = require('../../../db');

const EditUsers = async (req, res, next) =>{
    const {from, name, lastname, email, phone} = req.body;

    const data = {name, lastname, email, phone};

    const { id } = req.params;
    
    try {
        if(from === "profile"){
            // data["image"] = req.boy.image;
        }else{
            data["type"] = req.body.type;
        }

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message:"No existe un Usuario con el id"+id
            })
        }
        
        console.log("nueva data ", data);

        await usuario.update(data);
        
        return res.json(usuario);
        

    }
    catch (error) {
        next(error)
    }
    res.json({});
}

module.exports={
    EditUsers
}