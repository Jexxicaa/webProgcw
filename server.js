import express from 'express';
import sqlite3 from 'sqlite3';
import * as db from './entries.js';

db.initialise();

const app = express();
app.use(express.static('client'));
app.listen(8080);
console.log('Running on http://localhost:8080 to stop do Ctrl+C');

// open and close db
const mydb = new sqlite3.Database('./database.sql', sqlite3.OPEN_READWRITE, (err) => {
  if (err) { 
    return console.error(err.message); }
  console.log('Connected');
});

// close database
mydb.close((err) => { 
    if (err) { 
        return console.error(err.message); }
  console.log('Disconnected');
});

//root to get entries + add new one

app.get('/entry', gettheentries);

function gettheentries (req,res){
  res.json(db.getAllEntries());
}