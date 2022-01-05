const { Router } = require('express');
const { GetUsers } = require('../Controllers/RouterFunctions/Users/GetUsers');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');
const { GetUsersId } = require('../Controllers/RouterFunctions/Users/GetUsersId');
const { EditUsers } = require('../Controllers/RouterFunctions/Users/EditUsers');
//const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers')
const {getUserCart} = require('../Controllers/RouterFunctions/Users/GetUserCart');
const {putUserCart} = require('../Controllers/RouterFunctions/Users/PutUserCart');
const {PostUsers} = require('../Controllers/RouterFunctions/Users/PostUsers');
const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers');
const { ForgotPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ForgotPassword');

const { ResetPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ResetPassword')

const router = Router();

router.get('/', GetUsers);
router.get('/:id',GetUsersId);
router.get('/login', GetUser);
router.put('/:id',EditUsers);
router.delete('/:id',DeleteUsers);
router.put('/cart/:UserId', putUserCart);
router.get('/cart/:UserId', getUserCart);
router.post('/create', PostUsers);
router.delete('/:id',DeleteUsers)
router.patch('/forgotPassword', ForgotPassword);
router.patch('/:id/passwordReset', ResetPassword);


module.exports= router