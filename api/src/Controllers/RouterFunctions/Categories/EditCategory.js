const { Category } = require('../../../db');

const editCategory = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const { name } = req.body;        
        const eCategory = await Category.findByPk(id);
        if (!eCategory) {
            return res.status(404).json({
                message:"No existe un Categoria con el id"+id
            })
        };
        await eCategory.update({name});
        res.json(eCategory);
    } catch (error) {
        next(error)
    }
}

module.exports={
    editCategory
}