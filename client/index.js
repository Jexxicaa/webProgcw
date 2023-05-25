function init() {
  // Get the Add Entry button from HTML
  const addButton = document.querySelector("#add-entry-button");
  addButton.addEventListener("click", addEntry); // Add event listener thst calls the addEntry function
  loadEntries(); // Load existing entries
}

// a scroller function to scroll to the add entry form if the table is long
function scrollToEntryButton() {
  const scrollToEntryButton = document.getElementById('scrollToEntryButton');
  scrollToEntryButton.addEventListener('click', () => {
    const entrySection = document.getElementById('new-entry-form');
    entrySection.scrollIntoView({ behavior: 'smooth' });
  });
}

// display a random motivational quote at the top of the page
function randomQuote (){
  let quote = document.getElementById("quote");
  let random = Math.floor(Math.random() * quoteList.length);
  quote.textContent = quoteList[random];
}

//functionality for competencies drop down
function selectOption() {
  let dropdown = document.getElementById('dropdown');
  let output = document.getElementById('output');
  let selectedIndex = dropdown.selectedIndex;
  let selectedDescription = competencyDescriptions[selectedIndex - 1];
  output.textContent = selectedDescription;

}

//clears the drop down and puts it back to the first ID which is select a competency...
function clearDescription() {
  let dropdown = document.getElementById('dropdown');
  let output = document.getElementById('output');
  dropdown.selectedIndex = 0; 
  output.textContent = "";
}

let dropdown = document.getElementById('dropdown');
dropdown.addEventListener('blur', clearDescription); //disappears when the user clicks off the drop down /description


//To-Do List make input box
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//function to add task to the list
function addTask(){
  let li = document.createElement("li");
  li.textContent = inputBox.value;
  listContainer.appendChild(li);
  // add cross icon
  let span = document.createElement("span");
  span.textContent = "\u00d7"; //creates a cross icon
  li.appendChild(span);
  inputBox.value = "";
  
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {//if clicked entry, strike through the entry
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") { //if clicked cross, remove the entry
    e.target.parentElement.remove();
  }
});



function showEntries(entries, where) {
  // Show entries in a table with rows
  for (const entry of entries) {
    const row = document.createElement("tr");

    // Makes the cells
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
    const toolCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("no-print", "tool-button");
    editButton.addEventListener("click", () => {
      editEntry(entry, row);
    });
    toolCell.appendChild(editButton);

    // Create the delete button and adds an event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("no-print", "tool-button"); //makes sure its not printed
    deleteButton.addEventListener("click", () => {
      deleteEntry(entry);
    });
    toolCell.appendChild(deleteButton);

    // Append cells to the row
    row.appendChild(dateCell);
    row.appendChild(workCell);
    row.appendChild(knowledgeCell);
    row.appendChild(competencyCell);
    row.appendChild(toolCell);

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

async function saveEntry(saveButton, editForm, sub, row, entry) {
  // Get input values from form
  const date = document.querySelector("#date-input").value;
  const work = document.querySelector("#work-input").value;
  const knowledge = document.querySelector("#knowledge-input").value;
  const competencies = Array.from(
    document.querySelectorAll('input[name="competency"]:checked')
  ).map((checkbox) => checkbox.value).join(", ");

  console.log(entry)

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
  // await sendEntries(date, work, knowledge, competencies);

  // Reset form
  document.querySelector("#new-entry-form").reset();
  saveButton.remove();
  editForm.appendChild(sub);

  // Reset heading to original
  const heading = document.querySelector("#heading");
  heading.textContent = "Input Data:";

  await sendNewEntry(entry, date, work, knowledge, competencies);

}

async function deleteEntry(entry) {
  // Delete entry row from the table
  const row = entry.row;
  row.parentNode.removeChild(row);

  const delrow = {
    date : entry.date,
    work : entry.work,
    knowledge : entry.knowledge,
    competencies : entry.competencies,
  };
  
  const response = await fetch('http://localhost:8080/entries/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(delrow),
  });

  console.log(delrow)
  if (response.ok) { // Check the request was successful
    console.log("It's ok");
  } else {
    console.log("Failed to delete", response);
  };

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
    saveEntry(saveButton, editForm, sub, row, entry);
    document.querySelector("#new-entry-form").reset();
  });
}

function removeSubmit() {
  // Remove submit button and replace with save changes button
  const sub = document.querySelector("#add-entry-button");
  sub.remove();
  const editForm = document.querySelector("#editForm");
  const saveButton = document.createElement("button");
  saveButton.classList.add("button");
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


async function sendNewEntry(entry, date, work, knowledge, competencies) {
  //const rowIndex = row.getAttribute("data-index");

  const oldrow = {
    date : entry.date,
    work : entry.work,
    knowledge : entry.knowledge,
    competencies : entry.competencies,
  };
  // delete oldrow.row

  const payload = {
    row: oldrow,
    date,
    work,
    knowledge,
    competencies,
  };
  console.log("Payload", payload);

  const response = await fetch(`/entries/${1}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("It's ok");
  } else {
    console.log('Failed to send entry', response);
  }
}




init(); // Initialise the app
scrollToEntryButton();
randomQuote ();
clearDescription();
