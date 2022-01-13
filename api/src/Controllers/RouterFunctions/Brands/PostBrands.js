const { Brand } = require('../../../db')

const PostBrands = async(req, res, next) =>{
    try {
    const {name} = req.body
        let [newBrands, created] = await Brand.findOrCreate({
            where:{name}
        })
        res.status(200).json({created:created, newBrands});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    PostBrands
}