const { Router } = require('express');
const { GetUsers } = require('../Controllers/RouterFunctions/Users/GetUsers');
const { GetUsersId } = require('../Controllers/RouterFunctions/Users/GetUsersId');
const { EditUsers } = require('../Controllers/RouterFunctions/Users/EditUsers');
const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers')
const {putUserCart, getUserCart, deleteUserCart} = require('../Controllers/RouterFunctions/Users/Cart/');
const {getUserOrders, postUserOrder} = require('../Controllers/RouterFunctions/Users/Orders/');
const router = Router();

router.get('/', GetUsers);
router.get('/:id',GetUsersId);
router.put('/:id',EditUsers);
router.delete('/:id',DeleteUsers);

//Cart routes
router.put('/cart/:UserId', putUserCart);
router.get('/cart/:UserId', getUserCart);
router.delete('/cart/:UserId', deleteUserCart);
 
//Orders Routes
router.get('/orders/:UserId', getUserOrders);
router.post('/order/:UserId', postUserOrder)

module.exports= router