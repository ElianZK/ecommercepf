const { User } = require('../../../../db');
const jwt = require('jsonwebtoken');
const { SECRET_JWT_SEED } = process.env;
const {sendEmail} = require('../../EmailsFunctions/sendEmailForgot')


const ForgotPassword = async (req, res, next)=> {
    try {
        let { email } = req.body
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if (!user) {
            res.json({message:"Invalid email"});
        }
        let token = jwt.sign({user: user.email}, SECRET_JWT_SEED, {expiresIn:'15m'})

        await sendEmail(user, token);
        
        res.status(200).json({message: 'Check your email'});
    } catch (error) {
        next(error)
    }
}

module.exports={
    ForgotPassword
}