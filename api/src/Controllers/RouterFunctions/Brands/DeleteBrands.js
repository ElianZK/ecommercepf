const { Brand } = require('../../../db');

const DeleteBrands = async (req, res, next) =>{
    try {
        const {id} = req.params;
        console.log(`id`, id)
        const bra = await Brand.findByPk(id);
        if (!bra) {
            res.status(404).json({
                message:"no existe el Brands con ese id " + id
            })
        };
        await bra.destroy();

        
        res.json(bra);
    } catch (error) {
        next(error)
    }
}

module.exports={
    DeleteBrands
}
