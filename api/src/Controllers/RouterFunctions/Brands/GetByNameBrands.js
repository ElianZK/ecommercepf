const { Brand } = require('../../../db');
const { Op } = require('sequelize')

function brandsName(name){//FX que obtengo mi dato por el nombre pasado por el parametro
    return Brand.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`
                }
            }
        })
    }


const GetByNameBrands = async (req, res, next)=>{

    try {

        let { name } = req.query;
        
        let bra = await brandsName(name)

        if (bra.length ===0) {
            res.status(404).json({
                message:'No existe brands con ese nombre '+name
            })
        } else{

            // console.log(`bra`, bra)
            res.json(bra)
        }


    } catch (error) {
        next(error)
    }

}

module.exports={
    GetByNameBrands
}