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
        


        let { offset = 0, limit = 6 } = req.query;

        if(limit>6) next({message:"no superar el limit, el maximo permitido es 10"})
        
        // let {count, rows} = await User.findAndCountAll({ offset, limit });
        let {count, rows} = await User.findAndCountAll();

        if (rows.length===0) {
            return res.status(404).json({message:"DB no contiene Usuario"})
        } else {
            let userinfo = rows.map(e=>{
                return e;
            })
            
            return res.json({userinfo,total:count, limit, offset});
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