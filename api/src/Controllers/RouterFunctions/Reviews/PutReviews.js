const { Product, User, Reviews }=require('../../../db');

const PutReviews = async(req, res, next)=> {

    try {   
        let { idReview } = req.params;
        let { score, description } = req.body;

        //busco si existe el producto por id
        let rev = await Reviews.findByPk(idReview)
        //si no existe enviara un mensaje
        if (!rev) {
            res.status(404).json({
                message:'no existe review'
            })
        }
        //creo un nuevo review
        await rev.update({ score, description });
        res.json(rev);

    } catch (error) {
        next(error)
    }
}

module.exports={
    PutReviews
}