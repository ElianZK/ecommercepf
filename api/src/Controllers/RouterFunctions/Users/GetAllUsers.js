
const { User } = require('../../../db');


const GetAllUsers = async(req, res, next) =>{
    try {
        const users = await User.findAll()

        return res.json(users);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    GetAllUsers
}