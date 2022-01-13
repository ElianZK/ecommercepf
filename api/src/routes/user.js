const { Router } = require('express');
const { GetUser } = require('../Controllers/RouterFunctions/Users/GetUser');
const { CheckType } = require('../Controllers/RouterFunctions/Users/CheckType');
const { Changepassword } = require('../Controllers/RouterFunctions/Users/ChangePassword');
const { AdminExists } = require('../Controllers/RouterFunctions/Users/AdminExists');

const router = Router();

router.post("/login", GetUser);
router.get("/type/:idUser", CheckType);
router.put("/:idUser", Changepassword);
router.post("/adminExists", AdminExists);

module.exports = router