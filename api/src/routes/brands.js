const {Router} = require('express');
const router = Router();
const {GetBrands} = require('../Controllers/RouterFunctions/Brands/GetBrands');

const {PostBrands} = require('../Controllers/RouterFunctions/Brands/PostBrands');

const {EditBrand} = require('../Controllers/RouterFunctions/Brands/EditBrands');

const {GetByNameBrands} = require('../Controllers/RouterFunctions/Brands/GetByNameBrands');

const {DeleteBrands} = require('../Controllers/RouterFunctions/Brands/DeleteBrands');

router.get('/', GetBrands)
router.post('/',PostBrands)
router.put('/:id',EditBrand)
router.get('/search',GetByNameBrands)
router.delete('/:id',DeleteBrands)


module.exports= router;