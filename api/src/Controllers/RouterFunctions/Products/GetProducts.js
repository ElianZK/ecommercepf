const {Product,CategoryBrand, Brand, Category} = require('../../../db');
const {Op} = require('sequelize');
const getProducts= async (req, res, next)=>{
  try{
    const {
      offset=0, 
      limit=50, 
      search, 
      minPrice=0, 
      maxPrice, 
      category, 
      brand,
      condition, 
      stock=true
    } = req.query;

    if(limit>50) next({message: "The requested limit is higher than the allowed. Maximum allowed is 50", status:400})
    
    const options = {product:[], through:[]}; 
    //[Filter by Search
    if(search){
      options.product.push({name:{[Op.iLike]:`%${search}%`}});
    }
    //[Filter by Price
    if(maxPrice){
      options.product.push({price:{[Op.between]: [Number(minPrice),Number(maxPrice)]}});
    }else if(minPrice){
      options.product.push({price:{ [Op.gte]:Number(minPrice)}})
    }
    //[Filter by Category
    if(category){
      let cat = await Category.findOne({
        where:{
          name: {
            [Op.iLike]: category
          }
        },
      });
      options.through.push({CategoryId:cat.idCategory})
  
    }
    //[ Filter by Brand
    if(brand){
      let actualBrand = await Brand.findOne({
        where:{
          name:{
            [Op.iLike]: brand
          }
        }
      });
      options.through.push({BrandId:actualBrand.idBrand})
    }
    //[ FIlter by Condition
    if(condition){
      options.product.push({condition})
    }
    //[Filter by Stock
    if(stock){
      options.product.push({stock:{ [Op.gte]:1}})
    }

  
    let {count, rows} = await Product.findAndCountAll({
      where:{
        [Op.and]:[
          ...options.product
        ]
      },
      attributes:{
        exclude: ["image","attributes","sold_quantity","stock" ]
      },
      include:{
        model: CategoryBrand,
        as: "relation",
        where:{
          [Op.and]:[
            ...options.through
          ]
        }
      },
      limit,
      offset
    })
    if(count){
      let productsInfo = rows.map(el=>{
        let {idRelation, relation, ...otherData}= el.toJSON()
        return {...otherData}
      })
      return res.status(200).json({productsInfo, total:count, limit, offset})
    }else{
      return res.status(404).json({message: "Product not found"})
    }
  }catch(err){
    console.log("getProducts: ", err);
    next(err);
  }

}

module.exports ={
  getProducts
}