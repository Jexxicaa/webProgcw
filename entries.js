import fs from 'fs/promises';

let entries = [];

export async function initialise (){
    const data = await fs.readFile('entries.json');
    entries = JSON.parse(data);
}

export function getAllEntries (){
    return entries;
}