const {Category} = require('../../../db');

const postCategory = async(req, res, next) =>{
    try {
    const {name} = req.body
        let [newCategory, created] = await Category.findOrCreate({
            where:{name}
        })
        res.status(200).json({created:created, newCategory});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postCategory
};