
function init() {
    const addButton = document.querySelector("#add-entry-button");
    addButton.addEventListener("click", addEntry);
    loadEntries();
}

function showEntries(entries, where) {
    for (const entry of entries) {
        const { date, work, knowledge, competencies } = entry;

        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        row.appendChild(dateCell);

        const workCell = document.createElement('td');
        workCell.textContent = work;
        row.appendChild(workCell);

        const knowledgeCell = document.createElement('td');
        knowledgeCell.textContent = knowledge;
        row.appendChild(knowledgeCell);

        const competencyCell = document.createElement('td');
        competencyCell.textContent = competencies;
        row.appendChild(competencyCell);

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        // Add event listener for edit button

        editButton.addEventListener('click', () => {
            editEntry(entry, row);
        });

        editCell.appendChild(editButton);
        row.appendChild(editCell);
        where.appendChild(row);
    }
}


function removeContentFrom(what) {
    what.textContent = '';
}

async function loadEntries() {
    const response = await fetch('entry');
    let entries;
    if (response.ok) {
        entries = await response.json();
    } else {
        entries = ['failed to load entries :-('];
    }
    console.log(entries);

    const entryList = document.querySelector('#entries');
    removeContentFrom(entryList);
    showEntries(entries, entryList);
}

function addEntry(event) {
    event.preventDefault();

    // Get input values
    const date = document.querySelector("#date-input").value;
    const work = document.querySelector("#work-input").value;
    const knowledge = document.querySelector("#knowledge-input").value;
    const competencies = Array.from(document.querySelectorAll('input[name="competency"]:checked')).map(checkbox => checkbox.value).join(", ");

    const { editCell, editButton, row } = editTable(date, work, knowledge, competencies);

    //removes submit button and replaces it with save button
    const { saveButton, editForm, sub } = removeSubmit();

    // Add event listener to the save button
    saveButton.addEventListener("click", () => {
        // Get input values
        saveEntry(saveButton, editForm, sub, row);
        sendEntries(date,work,knowledge,competencies);
    });

    editCell.appendChild(editButton);

    // Add input values to the entries array
    addToArray(date, work, knowledge, competencies);

    // Reload entries to update the table
    loadEntries();

    // Reset form
    document.querySelector("#new-entry-form").reset();
}

function saveEntry(saveButton, editForm, sub, row) {
    const date = document.querySelector("#date-input").value;
    const work = document.querySelector("#work-input").value;
    const knowledge = document.querySelector("#knowledge-input").value;
    const competencies = Array.from(document.querySelectorAll('input[name="competency"]:checked')).map(checkbox => checkbox.value).join(", ");

    // Update table row
    const rowIndex = row.getAttribute("data-index");
    const dateCell = row.cells[0];
    const workCell = row.cells[1];
    const knowledgeCell = row.cells[2];
    const competencyCell = row.cells[3];


    dateCell.textContent = date;
    workCell.textContent = work;
    knowledgeCell.textContent = knowledge;
    competencyCell.textContent = competencies;

    // Reset form
    document.querySelector("#new-entry-form").reset();
    saveButton.remove();
    editForm.appendChild(sub);

    // Reset heading
    const heading = document.querySelector('#heading');
    heading.textContent = 'Input Data:';
}

function editEntry(entry, row) {
    // Set input values
    document.querySelector("#date-input").value = entry.date;
    document.querySelector("#work-input").value = entry.work;
    document.querySelector("#knowledge-input").value = entry.knowledge;

    // Check the corresponding checkboxes for competencies
    const competencies = entry.competencies.split(", ");
    const competencyCheckboxes = document.querySelectorAll('input[name="competency"]');
    competencyCheckboxes.forEach(checkbox => {
        checkbox.checked = competencies.includes(checkbox.value);
    });

    // Update heading
    const heading = document.querySelector('#heading');
    heading.textContent = 'Edit Data:';

    // Remove previous save button and add a new one
    const { saveButton, editForm, sub } = removeSubmit();
    saveButton.addEventListener("click", () => {
        saveEntry(saveButton, editForm, sub, row);
        

        
    });
}


function removeSubmit() {
    const sub = document.querySelector("#add-entry-button");
    sub.remove();
    const editForm = document.querySelector("#editForm");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    editForm.appendChild(saveButton);
    return { saveButton, editForm, sub };
}

function editTable(date, work, knowledge, competencies) {
    // Create table row
    const table = document.querySelector("#diary");
    const rowIndex = table.rows.length;
    const row = table.insertRow(-1);
    row.setAttribute("data-index", rowIndex);

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

    // Add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {

        //update heading
        const head = document.querySelector("#heading");
        head.textContent = "Edit Data:";
    });
    return { editCell, editButton, row };
}

/** Use fetch to post a JSON message to the server */
async function sendEntries(date,work,knowledge,competencies) {
    const payload = {
        date: date,
        work: work,
        knowledge: knowledge,
        competencies: competencies
    };
    console.log('Payload', payload);
  
    const response = await fetch('/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log('its ok')
      } else {
        console.log('failed to send entries', response);
      }
}


init();
