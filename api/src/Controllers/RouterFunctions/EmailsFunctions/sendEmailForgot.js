const { generarJWT } = require('../../../helpers/jwt');
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;


function sendEmail(user,token) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: user.email,// email
        from: "silcoro3@outlook.com", // your email
        subject: "Reset password requested | Restablecer contraseña solicitada",
        html: `
        <a href="http://localhost:3000/users/passwordReset/${user.idUser}/${token}">HAZ CLIC AQUÍ para Cambiar PASSWORD el usuario con el correo ${user.email}=>${token}</a>
        `
    };
    sgMail.send(msg)
        .then(() => {
        console.log("Email sent");
    }).catch((error) => {
        console.error(error);
    })
}

module.exports={
    sendEmail
}