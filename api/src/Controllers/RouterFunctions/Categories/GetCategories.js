const {Brand, Category} = require('../../../db')

const getCategories = async(req, res, next)=>{
  try{
    let categories = await Category.findAll({
      through:{
        attributes:[]
      }
    });
    return res.status(200).json(categories)
  }catch(err){
    console.log("GET /categories: ", err)
    next(err)
  }


}

module.exports = {
  getCategories
}