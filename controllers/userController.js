const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  // GET all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get users', error: err.message });
    }
  },

  // GET a single user by its _id and populate thought and friend data
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get user', error: err.message });
    }
  },

  // POST a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
  },

  // PUT updates user _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
  },

  // DELETE removes user by _id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      // remove thoughts associated with user
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
  },
};

module.exports = userController;
