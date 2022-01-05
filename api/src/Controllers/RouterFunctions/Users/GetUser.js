const { User } = require('../../../db');


const GetUser = async(req, res, next) =>{
    // try {
    //     let { offset = 0, limit = 6 } = req.query;

    //     if(limit>6) next({message:"no superar el limit, el maximo permitido es 10"})
        
    //     // let {count, rows} = await User.findAndCountAll({ offset, limit });
    //     let {count, rows} = await User.findAndCountAll();

    //     if (rows.length===0) {
    //         return res.status(404).json({message:"DB no contiene Usuario"})
    //     } else {
        
    //         let userinfo = rows.map(e=>{
    //             return e
    //         })
            
    //         res.json({userinfo,total:count, limit, offset})
    //     }
    // } catch (error) {
    //     next(error)
    // }
    console.log(req.body)
    // const {email, password} = req.body;

    res.json(req.body)

    // const user = await User.findOne({where: {
    //     email,
    //     password
    // }});

    // if(user){
    //     res.json({
    //         idUser: user.idUser,
    //         type: user.type,
    //         name: user.name + " " + user.lastname,
    //         email: user.email,
    //         phone: user.phone
    //     });
    // }else{
    //     res.status(404).json({message: "Usuario inexistente"});
    // }
}


module.exports = {
    GetUser
}