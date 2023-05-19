import fs from 'fs/promises';

//create entries array
let entries = [];

export async function initialise (){
    const data = await fs.readFile('entries.json'); // Read entries from json file
    entries = JSON.parse(data); // Parse JSON data and assign to the entries array
}

export function getAllEntries (){
    return entries; // Return all entries in entries array
}

export function addToArray (date, work, knowledge, competencies){
    // Add a entry to array
    entries.push({date,work,knowledge,competencies});
    
}

async function writeToDisk() {
    // Append updated array to JSON file
      await fs.appendFile('entries.json', entries);
}
  

writeToDisk(); // Write the entries to disk
