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
  row = JSON.stringify(row);
    for (const entry of entries) {
      if (JSON.stringify(entry) === row) { // Return the entry if it matches the given row
        return entry;
      }
    }
    return null; // Return null if no matching entry is found
  }

export function deleteEntry(row) {
  row = JSON.stringify(row);
  let entry;
    for (let i = 0; i < entries.length; i++) {
      entry = entries[i];
      if (JSON.stringify(entry) === row) {
        entries.splice(i, 2); // Remove the matching entry from the array
        writeToDisk(); // Write the updated entries to disk
        return true; // Return true to indicate successful deletion
      }
    }
    return null;
  }


export function addToArray (date, work, knowledge, competencies){
    // Add a entry to array
    entries.push({date,work,knowledge,competencies});
    writeToDisk(); // Write the entries to disk
}

export function updateToArray(row, date, work, knowledge, competencies) {
    const storedEntry = findEntry(row);
    if (!storedEntry) throw new Error('Entry not found');
  
    // Update the properties of the entry
    storedEntry.date = date;
    storedEntry.work = work;
    storedEntry.knowledge = knowledge;
    storedEntry.competencies = competencies;
  
    writeToDisk(); // Write the entries to disk

    return storedEntry;
  }
  

async function writeToDisk() {
  await fs.writeFile('entries.json', JSON.stringify(entries));
}
  