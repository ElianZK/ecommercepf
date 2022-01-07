const { Router } = require('express');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');

const router = Router();

router.post("/login", GetUser);

module.exports = router