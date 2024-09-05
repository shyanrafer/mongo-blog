const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtsRoutes = require('./api/thoughtsRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtsRoutes);

module.exports = router;

