const { Brand } = require('../../../db');

const GetBrands = async (req, res, next)=>{

    try {
        
    let bra = await Brand.findAll();

    if (bra.length ===0) {
        res.status(404).json({mesagge:"No hay Brands"})
    } else{
        res.json(bra)
    }


    } catch (error) {
        next(error)
    }

}

module.exports={
    GetBrands
}

