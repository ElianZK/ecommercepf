const { Router } = require('express');
const { getAllOrders } = require('../Controllers/RouterFunctions/Users/Orders');
const router = Router();

router.get('/orders', getAllOrders);

module.exports = router;