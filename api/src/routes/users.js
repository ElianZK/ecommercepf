const { Router } = require('express');
const { GetUsers } = require('../Controllers/RouterFunctions/Users/GetUsers');
const { GetUsersId } = require('../Controllers/RouterFunctions/Users/GetUsersId');
const { EditUsers } = require('../Controllers/RouterFunctions/Users/EditUsers');
const { DeleteUsers } = require('../Controllers/RouterFunctions/Users/DeleteUsers');
const { ForgotPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ForgotPassword');

const { ResetPassword } = require('../Controllers/RouterFunctions/Users/ResetPassword/ResetPassword')

const router = Router();

router.get('/', GetUsers);
router.get('/:id',GetUsersId);
router.put('/:id',EditUsers);
router.delete('/:id',DeleteUsers)
router.patch('/forgotPassword', ForgotPassword);
router.patch('/:id/passwordReset', ResetPassword);


module.exports= router