const {Product} = require('../../../db');

const getProductById = async (req, res, next) => {
    const {productID} = req.params;
    const productDb = await Product.findAll()
    .then(product => {
        let resProduct = product;
        let productFilter = resProduct.filter(product => {
            return product.idProduct === productID;
        })
        
        return res.json(productFilter.map(product => {
            return {
                idProduct: product.idProduct,
                name: product.name,
                price: product.price,
                stock: product.stock,
                image: product.image,
                attributes: product.attributes
            }
        }));
    })
    .catch((err)=> next(err));
}

module.exports = {
    getProductById
};