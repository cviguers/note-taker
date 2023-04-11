const notesRouter = require('express').Router();
const fs = require('fs')
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const path = require('path')

// GET route for /notes
notesRouter.get('/notes', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// GET request for reviews
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.status(200).json(`${req.method} request received to get notes`);

  // log request to the terminal
  console.info(`${req.method} request received to get notes`);

  readFromFile((data) => {
    res.json(data);
  })
});

// POST request to add a review
notesRouter.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title,  text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated Notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting Note');
  }
});
  
// notesRouter.delete('api/notes/:id', (req,res) => {
//   if (!req.params.id) res.sendStatus(400);
//   else {notes.delete(req.params.id);
//   res.sendStatus(200);}
// })

module.exports = notesRouter;