const { Product, User, Reviews }=require('../../../db');

const PostReviews = async(req, res, next)=> {

    try {   
        let { id } = req.params;
        let { userIdUser, score, description,productIdProduct } = req.body;
        console.log('req.body :>> ', req.body);

        //busco si existe el producto por id
        let prod = await Product.findByPk(id)
        //busco si existe el usuario por id
        let use = await User.findByPk(userIdUser)
        //si no existe enviara un mensaje
        if (!prod) {
            res.status(404).json({
                message:'no existe producto'
            })
        }
        if (!use) {
            res.status(404).json({
                message:'no existe usuario'
            })
        }
        //creo un nuevo review
        let newReview = await Reviews.create({
            score:score,
            description:description,
            productIdProduct:productIdProduct,
            userIdUser:userIdUser
        })

        res.json(newReview);

    } catch (error) {
        next(error)
    }
}

module.exports={
    PostReviews
}