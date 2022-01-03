const { Product, User, Reviews }=require('../../../db');

const GetReviews = async(req, res, next)=> {

    try {
        
        const { id } = req.params;
        //busca si existe el id de producto
        const prod = await Product.findByPk(id)
        //arrojara un mensaje si no existe el producto
        if (!prod) {
            res.status(404).json({
                message:"No existe producto"
            })
        }

        //busca todos los reviews con el id producto
        const revie = await Reviews.findAll({
            where:{
                productIdProduct: prod.idProduct
            }
        })
    
        res.json(revie)

    } catch (error) {
        next(error)
    }
}



module.exports={
    GetReviews
}