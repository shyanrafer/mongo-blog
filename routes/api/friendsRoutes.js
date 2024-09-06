const express = require('express');
const router = express.Router();
const friendsController = require('../../controllers/friendsController');

router.post('/add', friendsController.addFriend);

router.delete('/delete/:friendId', friendsController.deleteFriend);

module.exports = router;

