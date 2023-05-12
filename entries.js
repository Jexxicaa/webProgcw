import fs from 'fs/promises';

let entries = [];

export async function initialise (){
    const data = await fs.readFile('entries.json');
    entries = JSON.parse(data);
}

export function getAllEntries (){
    return entries;
}

//function to add to the array

export function addToArray (date, work, knowledge, competencies){
    entries.push({date,work,knowledge,competencies});
    
}

//write to disk so its stored
async function writeToDisk() {
      await fs.appendFile('entries.json', entries);
}
  

writeToDisk();
