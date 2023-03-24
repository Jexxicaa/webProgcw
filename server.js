
 import express from 'express';

const app = express();
app.use(express.static('client'));
app.listen(8080);
console.log('Running on http://localhost:8080 to stop do Ctrl+C'); 
