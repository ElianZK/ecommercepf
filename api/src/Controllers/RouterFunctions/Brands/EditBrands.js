const { Brand } = require('../../../db');

const EditBrand = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const { name } = req.body;        
        const bra = await Brand.findByPk(id);
        if (!bra) {
            return res.status(404).json({
                message:"No existe un Brands con el id"+id
            })
        };
        await bra.update({name});
        res.json(bra);
    } catch (error) {
        next(error)
    }
}

module.exports={
    EditBrand
}