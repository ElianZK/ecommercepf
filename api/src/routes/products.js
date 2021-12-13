const {Router} = require('express');
const {getProducts} = require('../Controllers/RouterFunctions/Products/GetProducts');
const {getProductById} = require('../Controllers/RouterFunctions/Products/GetProductById');
const {getProductBySearch} = require('../Controllers/RouterFunctions/Products/GetProductBySearch');
const {getProductByRankPrice} = require('../Controllers/RouterFunctions/Products//GetProductByRankPrice');
const {getByCategory} = require('../Controllers/RouterFunctions/Products/GetByCategory');
const { postProduct } = require('../Controllers/RouterFunctions/Products/PostProducts');
const { deleteProduct } = require('../Controllers/RouterFunctions/Products/DeleteProduct');
const { editProduct } = require('../Controllers/RouterFunctions/Products/EditProduct');
const router = Router();


router.get('/:productID', getProductById);

router.get('/', getProducts);

router.post('/',postProduct);


router.delete('/:id',deleteProduct);
router.put('/:id',editProduct)


module.exports= router;
