const jwt = require('jsonwebtoken');
// const jwt = require('jwt-simple');
// const moment = require('moment')

const { SECRET_JWT_SEED } = process.env;

const generarJWT = ( user ) => {
    return new Promise((resolve, reject)=>{
        let payload = { sub:user.idUser }
        jwt.sign(payload, SECRET_JWT_SEED,{
            expiresIn: '2h'
        },(err, token) =>{
            if (err) {
                reject('No se pudo generar token')
            }
            resolve(token)
        })
    })
}

// const generarJWT = (user)=>{
//     const payload = {
//         sub: user.idUser,
//         iat: moment().unix(),
//         exp: moment().add(1, 'days').unix()
//     }
// console.log(`object----->`, jwt.encode(payload, SECRET_JWT_SEED))
//     return jwt.encode(payload, SECRET_JWT_SEED)
// }





module.exports={
    generarJWT
}