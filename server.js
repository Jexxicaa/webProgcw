import express from 'express';
import * as ent from './index.js'
import * as db from './entries.js';

db.initialise();

const app = express();
app.use(express.static('client'));
app.listen(8080);
console.log('Running on http://localhost:8080 to stop do Ctrl+C');

//root to get entries + add new one

app.get('/entry', gettheentries);

function gettheentries (req,res){
  res.json(db.getAllEntries());
}


//POST to take whats on client and send to server

async function postEntry(req, res) {
  const { date, work, knowledge, competencies } = req.body;
  const entry = await db.addToArray( date, work, knowledge, competencies );
  res.json(entry);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.post('/entries', express.json(), asyncWrap(postEntry));

