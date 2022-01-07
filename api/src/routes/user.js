const { Router } = require('express');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');
const { CheckType } = require('../Controllers/RouterFunctions/Users/CheckType');

const router = Router();

router.post("/login", GetUser);
router.get("/type/:idUser", CheckType);

module.exports = router