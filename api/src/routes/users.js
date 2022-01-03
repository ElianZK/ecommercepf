const { Router } = require('express');
const { GetUsers } = require('../Controllers/RouterFunctions/Users/GetUsers');
const { GetUsersId } = require('../Controllers/RouterFunctions/Users/GetUsersId');
const { EditUsers } = require('../Controllers/RouterFunctions/Users/EditUsers');
const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers')
const {getUserCart} = require('../Controllers/RouterFunctions/Users/GetUserCart');
const {putUserCart} = require('../Controllers/RouterFunctions/Users/PutUserCart');
const {PostUsers} = require('../Controllers/RouterFunctions/Users/PostUsers');
const router = Router();

router.get('/', GetUsers);
router.get('/:id',GetUsersId);
router.put('/:id',EditUsers);
router.delete('/:id',DeleteUsers);
router.put('/cart/:UserId', putUserCart);
router.get('/cart/:UserId', getUserCart);
router.post('/create', PostUsers);

module.exports= router