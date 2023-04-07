// import needed packages and files
const express = require('express');
const path = require('path');
const fs = require('fs');

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




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// GET/api/notes reads db.json => saved notes as JSON
// POST/api/notes(new note)uuid!