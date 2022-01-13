const { Op } = require('sequelize');
const { Product,CategoryBrand,Category,Brand} = require('../../../db');


const postProduct = async(req, res, next) =>{
    var x;//variable para mi category
    var y;//variable para mi brand
    var z;// variable para mi categoryBrand
    try {
    let {name, price, stock, sold_quantity, condition,image,thumbnail, attributes, categories, brands} = req.body
        //attributes= JSON.stringify(attributes)
        //let json_att = JSON.parse(attributes)
        console.log(`attributes`, attributes)
        if (categories) {//compruebo si existe categories
        x = await Category.findOne({
                where:{
                    name:categories
                }
            })
        };
        if (brands) {//compruebo si existe brands
            y = await Brand.findOne({
                where:{
                    name:brands
                }
            })
        };
        
        // compruebo si existe la union entre el brand y category
        if (y.idBrand && x.idCategory) {
            z =   await CategoryBrand.findOne({
                    where:{
                        [Op.and]:[
                            {CategoryId:x.idCategory},
                            {BrandId: y.idBrand}
                        ]
                    }
                })
            }
             
            //si mi no conside mi bran y category arrojara null
        if (z === null) {
            res.status(404).json({
                message:"no se puede crear el producto porque brand y category no corresponde"
            })
        } else {
            console.log("hola xd")   
            let [newProduct, created] = await Product.findOrCreate({
                where:{name},
                defaults:{
                    price,
                    stock,
                    image:[image],
                    sold_quantity,
                    condition,
                    thumbnail,
                    attributes,
                    idRelation:z.idRelation
                }
            });
            console.log("hola2 xd")   
            res.status(200).json({created:created, newProduct});
        }
    } catch (error) {
        next(error)
    }
}

module.exports={
    postProduct
}