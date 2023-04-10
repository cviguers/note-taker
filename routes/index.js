// set up server, router path and ability to create routes
const express = require('express');
const path = require('path'); 
const router = require('express').Router(); 

// import modular router for /notes
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);


module.exports = app;