const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;