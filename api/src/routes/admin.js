const { Router } = require('express');
const { getAllOrders,putOrder } = require('../Controllers/RouterFunctions/Users/Orders');
const router = Router();

router.get('/orders', getAllOrders);
router.put('/order/:OrderId', putOrder);
module.exports = router;