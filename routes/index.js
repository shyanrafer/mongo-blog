const router = require('express').Router();
const userRoutes = require('./api/userRoutes');

// Prefix all user routes with /api/users
router.use('/api/users', userRoutes);
// need handles for thought/reaction
module.exports = router;
