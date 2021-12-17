const { Router } = require('express');
const { CreateUser } = require('../Controllers/RouterFunctions/AuthController/CreateUser')
const { LoginUser } = require('../Controllers/RouterFunctions/AuthController/LoginUser')


const router = Router();


router.post('/new', CreateUser);
router.post('/login', LoginUser);


module.exports= router