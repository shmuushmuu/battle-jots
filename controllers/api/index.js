const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const challengeRoutes = require('./challenge-routes.js');

router.use('/users', userRoutes);
router.use('/challenges', challengeRoutes);


module.exports = router;
