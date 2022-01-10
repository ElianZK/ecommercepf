const { User } = require('../../../db');

const Changepassword = async(req, res) =>{
    const {idUser} = req.params;
    const {value} = req.body;

    console.log(idUser);

    User.update(
        {changepassword: value},
        {where: {idUser}}
    );

    res.json({message: "exito"})
}

module.exports = {
    Changepassword
}