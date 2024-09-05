// import npm packs
const mongoose = require('mongoose');
require('dotenv').config();
// do i have the following code setup properly?
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongo_blog', {
  useNewUrlParser: true,
  // removes anitquated connecton options
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;