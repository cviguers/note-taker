//// server configuration
// import needed packages and files
const express = require('express');
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

// static middleware pointing to public folder
app.use(express.static('public'));

//// routes
// GET route to send client to index page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET route to send client to notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => { //Define a GET route for the '/notes' path
  fs.readFile(path.join(__dirname, './db/db.json'),  (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data)) 
  });
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // destructuring assignment for the items in req.body
  const { title,  text} = req.body;

  // if all the required properties are present
  if (title && text) {
    // variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // add a new note
        parsedNotes.push(newNote);

        // write updated notes back to the file
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

// creating request to delete note
app.delete('/api/notes/:id', (req, res) => { 
  // read current db
  fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
    if (err) throw err;

    // select note by assigned ID
    let noteID = req.params.id; 
    const parsedNotes = JSON.parse(data);
    const filteredNotes = parsedNotes.filter(note => note.id !== noteID);

    // write updated file back to db
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(filteredNotes), (err) => {
      if (err) throw err;
      console.log('Successfully deleted note');
      res.status(200).json({});
    });
  });
});



//// server start up and listening
// call express to listen for server instance, shows console log confirmation
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);