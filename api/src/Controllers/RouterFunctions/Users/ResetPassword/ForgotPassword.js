const { User } = require('../../../../db');
// const jwt = require('jsonwebtoken');
// const { SECRET_JWT_SEED } = process.env;
const { generarJWT } = require('../../../../helpers/jwt');
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY,REACT_APP_LINK } = process.env;

function sendEmail(user) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: user.email,// email
        from: "silcoro3@outlook.com", // your email
        subject: "Reset password requested | Restablecer contraseña solicitada",
        html: `
        <a href="${REACT_APP_LINK}/users/${user.idUser}/passwordReset">HAZ CLIC AQUÍ para Cambiar PASSWORD el usuario con el correo ${user.email}</a>
        `
    };
    sgMail.send(msg)
        .then(() => {
        console.log("Email sent");
    }).catch((error) => {
        console.error(error);
    })
}

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