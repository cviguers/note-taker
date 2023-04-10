//// server configuration
// import needed packages and files
const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// specify local and Heroku port
const PORT = process.env.PORT || 3001;

// create express instance
const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware pointing to public folder
app.use(express.static('public'));




//// routes
// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for all clicks
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.status(200).json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// POST request to add a review
app.post('/api/notes', (req, res) => {
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

app.delete('api/notes/:id', (req,res) => {
  if (!req.params.id) res.sendStatus(400);
  else {notes.delete(req.params.id);
  res.sendStatus(200);}
})


//// server start up and listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

