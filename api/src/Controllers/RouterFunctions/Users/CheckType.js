const { User } = require('../../../db');


const CheckType = async(req, res) =>{
    const {idUser} = req.params; 

    if(idUser != "null"){
        console.log("entro")
        const user = await User.findOne({where: {
            idUser
        }})
        
        let {type} = user.dataValues;
    
        if(type === "user"){
            console.log("es un " + type + " no puede acceder a una página del admin");
            res.json({access: false});
        }else{
            console.log("es un " + type + " así que puede acceder");
            res.json({access: true});
        }
    }

}


module.exports = {
    CheckType
}