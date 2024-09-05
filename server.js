// import npm packs
require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// set port to env port or to 3001
const PORT = process.env.PORT || 3001;
// create instance of app set to express
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express uses routes
app.use(routes);

// start the server after the database connection is established
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Connected on localhost:${PORT}`);
  });
});