//// server configuration
// import needed packages and files
const express = require('express');
const routes = require('./routes');
const path = require('path');
const fs = require('fs');

// helper method for generating unique ids
const uuid = require('./helpers/uuid');

// create express instance
const app = express();

// specify local and Heroku port
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// direct all instances of express to /routes
app.use(routes);

// static middleware pointing to public folder
app.use(express.static('public'));

//// server start up and listening
// call express to listen for server instance, shows console log confirmation
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);