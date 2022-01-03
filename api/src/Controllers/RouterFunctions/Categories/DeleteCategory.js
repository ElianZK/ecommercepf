const {Category} = require('../../../db');

const deleteCategory = async (req, res, next) =>{
    try {
        const {id} = req.params;
        console.log(`id`, id)
        const dCategory = await Category.findByPk(id);
        if (!dCategory) {
            res.status(404).json({
                message:"no existe el Categoria con ese id " + id
            })
        };
        await dCategory.destroy();

        
        res.json(dCategory);
    } catch (error) {
        next(error);
    }
}

module.exports={
    deleteCategory
}