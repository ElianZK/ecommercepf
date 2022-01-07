const { User } = require('../../../db');


const GetUser = async(req, res) =>{
    const {email, password, accountType} = req.body;
    let user = {};

    if(accountType === "internal"){
        user = await User.findOne({where: {
            email,
            password
        }});    
    }else{
        user = await User.findOne({where: {
            email
        }}); 
    }

    if(user){
        res.json({
            idUser: user.idUser,
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