const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

  
  
  module.exports = notes;