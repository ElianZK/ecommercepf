const { Product, User, Reviews }=require('../../../db');

const PostReviews = async(req, res, next)=> {

    try {   
        let { id } = req.params;
        let { idUser, score, description } = req.body;

        //busco si existe el producto por id
        let prod = await Product.findByPk(id)
        //si no existe enviara un mensaje
        if (!prod) {
            res.status(404).json({
                message:'no existe producto'
            })
        }
        //creo un nuevo review
        let newReview = await Reviews.create({
            score:score,
            description:description,
            productIdProduct:id,
            userIdUser:idUser
        })

        res.json(newReview);

    } catch (error) {
        next(error)
    }
}

module.exports={
    PostReviews
}