async function fetchEntries() {
  
    const response = await fetch('/entry'); // Send request to fetch entries from server
    const entries = await response.json(); // Parse data as JSON
    const entryTableEntries = document.getElementById('entryTableEntries'); // Get table entries element for entries
    
    entries.forEach(entry => { // Iterate over entries + create rows for each 
      const row = document.createElement('tr'); // Create new table row
      
      // Create cells 
      const dateCell = document.createElement('td');
      const workCell = document.createElement('td');
      const knowledgeCell = document.createElement('td');
      const competenciesCell = document.createElement('td');

      // Set the text content of cells
      dateCell.textContent = entry.date;
      workCell.textContent = entry.work;
      knowledgeCell.textContent = entry.knowledge;
      competenciesCell.textContent = entry.competencies;

      // Append cells to the row
      row.appendChild(dateCell);
      row.appendChild(workCell);
      row.appendChild(knowledgeCell);
      row.appendChild(competenciesCell);

      entryTableEntries.appendChild(row);
    });

}

// Call fetchEntries function to get and show entries
fetchEntries();
