const { User } = require('../../../db');


const GetUser = async(req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({where: {
        email,
        password
    }});

    if(user){
        res.json({
            idUser: user.idUser,
            type: user.type,
            name: user.name + " " + user.lastname,
            email: user.email,
            phone: user.phone
        });
    }else{
        res.status(404).json({message: "Usuario inexistente"});
    }
}


module.exports = {
    GetUser
}