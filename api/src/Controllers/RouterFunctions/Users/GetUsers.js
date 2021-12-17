const { User } = require('../../../db');


const GetUsers = async(req, res, next) =>{
    try {
        let { offset = 0, limit = 6 } = req.query;

        if(limit>6) next({message:"no superar el limit, el maximo permitido es 10"})
        
        let {count, rows} = await User.findAndCountAll({ offset, limit });

        if (rows.length===0) {
            return res.status(404).json({message:"DB no contiene Usuario"})
        } else {
        
            let userinfo = rows.map(e=>{
                return e
            })
            
            res.json({userinfo,total:count, limit, offset})
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    GetUsers
}