const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser, 
} = require('../../controllers/userController');

// handles /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// handles /api/users/:id
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// export routes
module.exports = router;
