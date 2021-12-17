const {Product} = require('../../../db');

const getProductBySearch = async (req, res, next) => {
    const {search} = req.query;
    const productDb = await Product.findAll()
    .then(product => {
        let resProduct = product;
        let productFilter = resProduct.filter(product => {
            return product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        })
        if (productFilter.length>0) {
            return res.json(productFilter.map(product => {
                return {
                    idProduct: product.idProduct,
                    name: product.name,
                    price: product.price,
                    thumbnail: product.thumbnail
                }
            }));
        }else{
            return res.status(404).json({ msg: "Product not found" });
        }        
    })
    .catch((err)=> next(err));
};

module.exports = {
    getProductBySearch
};