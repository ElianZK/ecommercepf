const { User } = require('../../../db');

const EditUsers = async (req, res, next) =>{
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const {from, name, lastname, email, phone, password} = req.body;

    const data = {name, lastname, email, phone, password};

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

        const newUser = await usuario.update(data);
        
        if(from === "profile"){
            console.log("lo voy a retornar ", newUser)
            return res.json(newUser);
        }
    }
    catch (error) {
        next(error)
    }
    res.json({});
}

module.exports={
    EditUsers
}