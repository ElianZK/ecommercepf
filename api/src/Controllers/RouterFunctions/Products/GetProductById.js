const {Product,Category, CategoryBrand, Brand} = require('../../../db');

const getProductById = async (req, res, next) => {
  try{

    const {ProductId} = req.params;
    const productDb = await Product.findByPk(ProductId);
    let resProduct = productDb.toJSON();
    let brandAndCategory = await CategoryBrand.findByPk(productDb.idRelation);

    let brand = await Brand.findOne({
      where:{
        idBrand: brandAndCategory.BrandId
      },
      attributes:{
        exclude:["idBrand"]
      }
    })
    let category = await Category.findOne({
      where:{
        idCategory: brandAndCategory.CategoryId
      },
      attributes:{
        exclude:["idCategory"]
      }
    })

    return res.status(200).json([{...resProduct, brand:brand.name, category:category.name}]);
    
  }catch(error){
    console.log("/products/:ProductId");
    next(error);
  }
}

module.exports = {
    getProductById
};