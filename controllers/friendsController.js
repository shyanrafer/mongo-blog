const User = require('../models/User');
const Friend = require('../models/Friend');

// add a friend to a user
exports.addFriend = async (req, res) => {
  const { userId, name } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friend = new Friend({ name, userId });
    await friend.save();

    user.friends.push(friend._id);
    await user.save();

    res.status(201).json({ message: 'Friend added successfully', friend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding friend', error });
  }
};

// delete a friend from a user's list
exports.deleteFriend = async (req, res) => {
  const { userId } = req.body;
  const { friendId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Friend.findByIdAndDelete(friendId);

    user.friends = user.friends.filter(friend => friend.toString() !== friendId);
    await user.save();

    res.json({ message: `Friend with ID ${friendId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting friend', error });
  }
};
