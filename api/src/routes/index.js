const { Router } = require('express');
// Importar todos los routers;
const ProductRoutes = require('./products');
const UserRoutes = require('./users');
const CategoryRouter = require('./categories');
const BrandsRouter = require('./brands');
const AuthRouter = require('./auth');
const ReviewsRouter = require('./Reviews');
const user = require('./user');
const emailUser = require('./email');


const router = Router();
router.use('/categories', CategoryRouter);
router.use('/products', ProductRoutes);
router.use('/brands', BrandsRouter);
router.use('/auth',AuthRouter);
router.use('/users', UserRoutes);
router.use('/product', ReviewsRouter)
router.use("/user", user)
router.use("/api", emailUser)
module.exports = router;
