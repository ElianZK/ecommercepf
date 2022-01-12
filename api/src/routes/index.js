const { Router } = require('express');
// Importar todos los routers;
const ProductRoutes = require('./products');
const UserRoutes = require('./users');
const CategoryRouter = require('./categories');
const BrandsRouter = require('./brands');
const AuthRouter = require('./auth');
const ReviewsRouter = require('./Reviews');
const user = require('./user');
<<<<<<< HEAD
const emailUser = require('./email');

const admin = require('./admin');
=======
const admin = require('./admin');
const emailUser = require('./email');

>>>>>>> origin/develop-fran

const router = Router();
router.use('/categories', CategoryRouter);
router.use('/products', ProductRoutes);
router.use('/brands', BrandsRouter);
router.use('/auth',AuthRouter);
router.use('/users', UserRoutes);
router.use('/product', ReviewsRouter)
router.use("/user", user)
router.use("/admin", admin)
router.use("/api", emailUser)
module.exports = router;
