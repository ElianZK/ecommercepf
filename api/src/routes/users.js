const { Router } = require('express');
const { GetUsers } = require('../Controllers/RouterFunctions/Users/GetUsers');
const { GetAllUsers } = require('../Controllers/RouterFunctions/Users/GetAllUsers');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');
const { GetUsersId } = require('../Controllers/RouterFunctions/Users/GetUsersId');
const { EditUsers } = require('../Controllers/RouterFunctions/Users/EditUsers');
const {PostUsers} = require('../Controllers/RouterFunctions/Users/PostUsers');
const { ForgotPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ForgotPassword');
const { ResetPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ResetPassword')
const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers')
const {putUserCart, getUserCart, deleteUserCart} = require('../Controllers/RouterFunctions/Users/Cart/');
const {getUserOrders, postUserOrder} = require('../Controllers/RouterFunctions/Users/Orders/');
const {getUserWishList, postUserWishList, deleteWishListProduct} = require('../Controllers/RouterFunctions/Users/WishList');
const router = Router();

router.get('/', GetUsers);
router.get('/all', GetAllUsers);
router.get('/:id',GetUsersId);
router.get('/login', GetUser);
router.put('/:id',EditUsers);
router.delete('/:id',DeleteUsers);
router.post('/create', PostUsers);
router.delete('/:id',DeleteUsers)
router.patch('/forgotPassword', ForgotPassword);
router.patch('/:id/passwordReset', ResetPassword);

//Cart routes
router.put('/cart/:UserId', putUserCart);
router.get('/cart/:UserId', getUserCart);
router.delete('/cart/:UserId', deleteUserCart);
 
//Orders Routes
router.get('/orders/:UserId', getUserOrders);
router.get('/orders/:UserId/:OrderId', getUserOrders);
router.post('/order/:UserId', postUserOrder)

//WishList Routes
router.get('/wishlist/:UserId', getUserWishList);
router.post('/wishlist/:UserId/:ProductId', postUserWishList);
router.delete('/wishlist/:UserId/:ProductId', deleteWishListProduct)
module.exports= router