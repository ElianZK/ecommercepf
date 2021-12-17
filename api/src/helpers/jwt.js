const jwt = require('jsonwebtoken');
const { SECRET_JWT_SEED } = process.env;

const generarJWT = ( uid, name ) => {
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(err, token) =>{
            if (err) {
                reject('no se pudo generar token')
            }
            resolve(token)
        })
    })
}

module.exports={
    generarJWT
}