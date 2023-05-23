function init() {
  // Get the Add Entry button from HTML
  const addButton = document.querySelector("#add-entry-button");
  addButton.addEventListener("click", addEntry); // Add event listener thst calls the addEntry function
  loadEntries(); // Load existing entries
}

function showEntries(entries, where) {
  // Show entries in a table with rows
  for (const entry of entries) {
    const row = document.createElement("tr");

    // Makes tghe cells
    const dateCell = document.createElement("td");
    const workCell = document.createElement("td");
    const knowledgeCell = document.createElement("td");
    const competencyCell = document.createElement("td");

    // Sets text content
    dateCell.textContent = entry.date;
    workCell.textContent = entry.work;
    knowledgeCell.textContent = entry.knowledge;
    competencyCell.textContent = entry.competencies;

    // Create the edit button and adds an event listener
    const editCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("no-print");
    editButton.addEventListener("click", () => {
      editEntry(entry, row);
    });
    editCell.appendChild(editButton);

    // Create the delete button and adds an event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("no-print"); //makes sure its not printed
    deleteButton.addEventListener("click", () => {
      deleteEntry(entry);
    });
    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteButton);

    // Append cells to the row
    row.appendChild(dateCell);
    row.appendChild(workCell);
    row.appendChild(knowledgeCell);
    row.appendChild(competencyCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    // Makes sure it adds it to the correct row
    where.appendChild(row);

    
    entry.row = row;
  }
}

function removeContentFrom(what) {
  // Removes children from element
  while (what.firstChild) {
    what.removeChild(what.firstChild);
  }
}

async function loadEntries() {
  // Fetchs entries from the server
  const response = await fetch("entry");
  let entries;
  if (response.ok) {
    entries = await response.json();
  } else {
    entries = ["failed to load entries :-("];
  }
  console.log(entries);

  // Remove existing content from entry list
  const entryList = document.querySelector("#entries");
  removeContentFrom(entryList);
  showEntries(entries, entryList); // Display fetched entries in entry list
}

function addEntry(event) {
  event.preventDefault();

  // Get input values from form
  const date = document.querySelector("#date-input").value;
  const work = document.querySelector("#work-input").value;
  const knowledge = document.querySelector("#knowledge-input").value;
  const competencies = Array.from(
    document.querySelectorAll('input[name="competency"]:checked')
  ).map((checkbox) => checkbox.value).join(", ");

  // Send the entries to the server for saving
  sendEntries(date, work, knowledge, competencies);

  // Reload entries to update the table
  loadEntries();

  document.querySelector("#new-entry-form").reset();
}

function saveEntry(saveButton, editForm, sub, row) {
  // Get input values from form
  const date = document.querySelector("#date-input").value;
  const work = document.querySelector("#work-input").value;
  const knowledge = document.querySelector("#knowledge-input").value;
  const competencies = Array.from(
    document.querySelectorAll('input[name="competency"]:checked')
  ).map((checkbox) => checkbox.value).join(", ");

  // Update table row with new entries
  const dateCell = row.cells[0];
  const workCell = row.cells[1];
  const knowledgeCell = row.cells[2];
  const competencyCell = row.cells[3];

  dateCell.textContent = date;
  workCell.textContent = work;
  knowledgeCell.textContent = knowledge;
  competencyCell.textContent = competencies;

  // Send the entries to the server for saving
  sendEntries(date, work, knowledge, competencies);

  // Reset form
  document.querySelector("#new-entry-form").reset();
  saveButton.remove();
  editForm.appendChild(sub);

  // Reset heading to original
  const heading = document.querySelector("#heading");
  heading.textContent = "Input Data:";
}

function deleteEntry(entry) {
  // Delete entry row from the table
  const row = entry.row;
  row.parentNode.removeChild(row);
}

function editEntry(entry, row) {
  // Fill the form with the prior entry for editing
  document.querySelector("#date-input").value = entry.date;
  document.querySelector("#work-input").value = entry.work;
  document.querySelector("#knowledge-input").value = entry.knowledge;

  // Check checkboxes for competencies
  const competencies = entry.competencies.split(", ");
  const competencyCheckboxes = document.querySelectorAll(
    'input[name="competency"]'
  );
  competencyCheckboxes.forEach((checkbox) => {
    checkbox.checked = competencies.includes(checkbox.value);
  });

  // Update heading
  const heading = document.querySelector("#heading");
  heading.textContent = "Edit Data:";

  // Remove submit button and add a event listener for save changes
  const { saveButton, editForm, sub } = removeSubmit();
  saveButton.addEventListener("click", () => {
    saveEntry(saveButton, editForm, sub, row);
    document.querySelector("#new-entry-form").reset();
  });
}

function removeSubmit() {
  // Remove submit button and replace with save changes button
  const sub = document.querySelector("#add-entry-button");
  sub.remove();
  const editForm = document.querySelector("#editForm");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Changes";
  editForm.appendChild(saveButton);
  return { saveButton, editForm, sub };
}

function editTable(date, work, knowledge, competencies) {
  // Create a new table row
  const table = document.querySelector("#diary");
  const rowIndex = table.rows.length;
  const row = table.insertRow(-1);
  row.setAttribute("data-index", rowIndex);

  // Create cells
  const dateCell = row.insertCell(0);
  const workCell = row.insertCell(1);
  const knowledgeCell = row.insertCell(2);
  const competencyCell = row.insertCell(3);
  const editCell = row.insertCell(4);

  // Add data to table row
  dateCell.textContent = date;
  workCell.textContent = work;
  knowledgeCell.textContent = knowledge;
  competencyCell.textContent = competencies;

  // Add edit button to the row
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("no-print");
  editButton.addEventListener("click", () => {
    editEntry(entry, row);
  });
  editCell.appendChild(editButton);
  return { editCell, editButton, row };
}

//Use fetch to post a JSON message to the server 
async function sendEntries(date, work, knowledge, competencies) {
  const payload = { // Create payload object with the entry data
    date: date,
    work: work,
    knowledge: knowledge,
    competencies: competencies,
  };
  console.log("Payload", payload);

  const response = await fetch("/entries", {
    method: "POST", // Send POST request to the server with payload
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) { // Check the request was successful
    console.log("It's ok");
  } else {
    console.log("Failed to send entries", response);
  }
}

init(); // Initialise the app
