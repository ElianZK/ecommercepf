const { Router } = require('express');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');
const { CheckType } = require('../Controllers/RouterFunctions/Users/CheckType');
const { Changepassword } = require('../Controllers/RouterFunctions/Users/changePassword');

const router = Router();

router.post("/login", GetUser);
router.get("/type/:idUser", CheckType);
router.put("/:idUser", Changepassword);

module.exports = router