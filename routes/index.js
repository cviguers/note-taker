// set up server, router path and ability to create routes
const express = require('express');

// import modular router for /notes
const notesRouter = require('./notes');

const app = express();

// create instance of express for /notes and notes router
app.use('/notes', notesRouter);


module.exports = app;