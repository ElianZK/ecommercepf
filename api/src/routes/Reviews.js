const { Router } = require('express');

const { GetReviews } = require('../Controllers/RouterFunctions/Reviews/GetReviews')
const { PostReviews } = require('../Controllers/RouterFunctions/Reviews/PostReviews');
const { PutReviews } = require('../Controllers/RouterFunctions/Reviews/PutReviews');
const { DeleteReviews } = require('../Controllers/RouterFunctions/Reviews/DeleteReviews');

const router = Router();

router.get('/:id/review', GetReviews);
router.post('/:id/review', PostReviews);
router.put('/:id/review/:idReview', PutReviews);
router.delete('/:id/review/:idReview', DeleteReviews);

module.exports = router;