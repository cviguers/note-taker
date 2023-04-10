// set up server, router path and ability to create routes
const express = require('express');
const path = require('path')

// import modular router for /notes
const notesRouter = require('./notes');

const app = express();

// create instance of express for /notes and notes router
app.use('/notes', notesRouter);

// GET route for notes page
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

// GET route for index page
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );



module.exports = app;