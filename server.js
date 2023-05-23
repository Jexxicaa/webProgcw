import express from 'express';
import * as ent from './entries.js';

ent.initialise(); // Initialize the entries

const app = express(); // Create express app
app.use(express.static('client')); // allow files from client 

// Start the server
app.listen(8080);
console.log('Running on http://localhost:8080 to stop do Ctrl+C');


// Route to get entries
app.get('/entry', gettheentries);

function gettheentries (req,res){
  // Retrieve entries from ent and send as json response
  res.json(ent.getAllEntries());
}


// Route to add a new entry
app.post('/entries', express.json(), asyncWrap(postEntry));


//POST to take whats on client and send to server
async function postEntry(req, res) {
  const { date, work, knowledge, competencies } = req.body;
  const entry = await ent.addToArray( date, work, knowledge, competencies ); // Add the entry to ent
  res.json(entry);// Send added entry as JSON
}

//PUT to take edited on client and send to server
async function putEntry(req,res){
  const  
}

// Wrap to handle async route handlers
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

