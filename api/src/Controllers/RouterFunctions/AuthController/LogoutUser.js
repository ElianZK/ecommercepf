const session = require('express-session')

const LogoutUser = async (req, res, next) => {

    try {
        req.session.destroy(err =>{
            if(err){
                return res.redirect('/nombre');
            }
            res.clearCookie('sid');
            res.redirect('/')
        })


    } catch (error) {
        next(error)
    }

}

module.exports={
    LogoutUser
}