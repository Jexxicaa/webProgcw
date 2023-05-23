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

export function findEntry(row) {
    for (const entry of entries) {
      if (entry.row === row) {
        return entry;
      }
    }
    return null;
  }

export function addToArray (date, work, knowledge, competencies){
    // Add a entry to array
    entries.push({date,work,knowledge,competencies});
    
}

export function updateToArray(row, date, work, knowledge, competencies) {
    const storedEntry = findEntry(row);
    if (!storedEntry) throw new Error('Entry not found');
  
    // Update the properties of the entry
    storedEntry.date = date;
    storedEntry.work = work;
    storedEntry.knowledge = knowledge;
    storedEntry.competencies = competencies;
  
    return storedEntry;
  }
  

  async function writeToDisk() {
    await fs.writeFile('entries.json', JSON.stringify(entries));
  }
  
  

writeToDisk(); // Write the entries to disk
