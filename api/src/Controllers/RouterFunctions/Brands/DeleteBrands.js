const { Brand, Category, CategoryBrand,Product } = require('../../../db');

const DeleteBrands = async (req, res, next) =>{
    try {
        const {id} = req.params;

        //existe mi brands? x id
        let bra = await Brand.findByPk(id);
        
        //si no existe devuelve un mensaje
        if (!bra) {
            res.status(404).json({
                message:"no existe el Brands con ese id " + id
            })
        }else{//si existe
            
            //verifica que exista en la tabla CategoryBrand
            let pruebabrand = await CategoryBrand.findOne({
                where:{
                    BrandId:bra.idBrand
                }
            })

//si pruebabrand es null significa no encontro vinculo alguno
            if (bra.idBrand && pruebabrand===null) {
                // elimina el brands sin conexion
                await bra.destroy();                
                res.json(bra);
            } else if(bra.idBrand === pruebabrand.BrandId){
        // si existe y los 2 ID son iguales enviara un mensaje
                res.json({
                    message:'Brands No se Puede Eliminar porque esta vinculado con un Producto y una  Categoria'
            })
        }
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    DeleteBrands
}
