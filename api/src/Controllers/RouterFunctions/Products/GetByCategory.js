const {Category,CategoryBrand,Product} = require('../../../db');

const getByCategory = async (req, res, next) => {
    const {category} = req.query;
    const productsDb = await Product.findAll();
    const categoryBrandDb = await CategoryBrand.findAll();
    const categoryDb = await Category.findAll()
    Promise.all([productsDb,categoryBrandDb,categoryDb])
    .then(resp=>{
        let [resProduts,resCategoryBrand,resCategory] =  resp;
        resCategory = resCategory.find(c=>{
            return c.name.toLocaleLowerCase()===category.toLocaleLowerCase()
        })
        resCategoryBrand = resCategoryBrand.filter(categ=>{
            return categ.CategoryId === resCategory.idCategory
        })
        resCategoryBrand= resCategoryBrand.map(categ=>{
            return categ.idRelation
        })
        let arrTemp = [];
        let arrTemp2 = [];
        arrTemp2 = resCategoryBrand;
        for (let i = 0; i < arrTemp2.length; i++) {
            arrTemp.push(resProduts.find(product => {
                return product.idRelation === arrTemp2[i];
            }))            
        }
        return res.json(arrTemp.map(product => {
            return {
                idProduct: product.idProduct,
                name: product.name,
                price: product.price,
                thumbnail: product.thumbnail
            }
        }))
    })
    .catch((err)=> next(err));
};

module.exports = {
    getByCategory
};