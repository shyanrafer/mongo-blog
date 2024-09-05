// import npm packs
const mongoose = require('mongoose');
require('dotenv').config();
// do i have the following code setup properly?
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongo_blog', {
  // removed the options here as they gave warnings in the cli
});

module.exports = mongoose.connection;