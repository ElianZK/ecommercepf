const { Brand, Category } = require('../../../db');

const GetBrands = async (req, res, next)=>{
    try {
      const {category, all} = req.query;
    
    if(category){
      let categories = await Category.findAll({
        where:{
          name: category
        },
        attributes:{
        },
        include:{
          model:Brand,
          attributes:{
            through: []
          },
          through:{
            attributes:[]}
        }
      })
      return res.status(200).json(categories[0].brands);
    }else{
      let brands = await Brand.findAll();
      if (brands.length ===0) {
          res.status(404).json({mesagge:"No hay Brands"})
      } else{
          res.json(brands)
      }
    }

    } catch (error) {
        next(error)
    }

}

module.exports={
    GetBrands
}

