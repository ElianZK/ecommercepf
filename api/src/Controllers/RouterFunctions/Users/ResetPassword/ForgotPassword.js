const { User } = require('../../../../db');
// const jwt = require('jsonwebtoken');
// const { SECRET_JWT_SEED } = process.env;
const {sendEmail} = require('../../HtmlMain/sendEmailForgot')


const ForgotPassword = async (req, res, next)=> {
    try {
        let { email } = req.body
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if (!user) {
            res.status(404).json({message:"Invalid email"});
        }
        // let token = await generarJWT( user )
        // await sendEmail(user, token);
        await sendEmail(user);
        res.status(200).json({message: 'Check your email | Consultar su correo electrónico'});
    } catch (error) {
        next(error)
    }
}

module.exports={
    ForgotPassword
}