const {Router} = require('express');
const router = Router();
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.HERN_EMAIL)




router.post('/mail',  (req, res, next) =>{
    const { to, subject, html, sandboxMode = false} = req.body;
    
    const msg = {
        to, 
        from: 'fcosantiagoc@gmail.com',
        subject: 'subject',
        //text,
        html: `{html}`,
        mail_settings: {
            sandbox_mode: {
                enable: sandboxMode  //para que no cobre
            }
        }
    };
    try{
    //console.log("email", sgMail)
        sgMail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            
            res.status(202).send({ success: true });
        })
        .catch((error) => {
            res.status(400).send(error)
        })
        console.log(msg)
        
    } catch (error) {
        return res.status(500);
    }
}),

module.exports = router
