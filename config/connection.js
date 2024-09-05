// import npm packs
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongo_db', {
  useNewUrlParser: true,
  // removes anitquated connecton options
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;