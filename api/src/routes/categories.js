const {Router} = require('express');
const router = Router();
const {getCategories} = require('../Controllers/RouterFunctions/Categories/GetCategories');
const {postCategory} = require('../Controllers/RouterFunctions/Categories/PostCategory');
const {deleteCategory} = require('../Controllers/RouterFunctions/Categories/DeleteCategory');
const { editCategory } = require('../Controllers/RouterFunctions/Categories/EditCategory');

router.get('/', getCategories)
router.post('/', postCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', editCategory)

module.exports= router;