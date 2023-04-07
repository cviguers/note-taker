// import needed packages and files
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');


const PORT = 3001;

const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for api
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/reviews`);
  res.status(200).json(noteData);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { text, title } = req.body;

  // If all the required properties are present
  if (text && title) {
    // Variable for the object we will save
    const newNote = {
      text,
      title,
      review_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error is posting, check to make sure you included both text and title');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// GET/api/notes reads db.json => saved notes as JSON
// POST/api/notes(new note)uuid!