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
  