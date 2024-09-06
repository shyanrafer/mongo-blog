const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtsRoutes = require('./api/thoughtsRoutes');
const friendRoutes = require('./api/friendsRoutes');

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtsRoutes);
router.use('/api/friends', friendRoutes);

module.exports = router;

