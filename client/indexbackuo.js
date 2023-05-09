function addEntry(event) {
  event.preventDefault();

  // Get input values
  const date = document.querySelector("#date-input").value;
  const work = document.querySelector("#work-input").value;
  const knowledge = document.querySelector("#knowledge-input").value;
  const competencies = Array.from(document.querySelectorAll('input[name="competency"]:checked')).map(checkbox => checkbox.value).join(", ");

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
  editButton.addEventListener("click", function() {

    //update heading
    const head = document.querySelector("#heading");
    head.textContent = "Edit Data:";

    //removes submit button and replaces it with save button
    const sub = document.querySelector("#add-entry-button");
    sub.remove();
    const editForm = document.querySelector("#editForm");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    editForm.appendChild(saveButton);

    // Add event listener to the save button
    saveButton.addEventListener("click", function() {
      // Get input values
      const date = document.querySelector("#date-input").value;
      const work = document.querySelector("#work-input").value;
      const knowledge = document.querySelector("#knowledge-input").value;
      const competencies = Array.from(document.querySelectorAll('input[name="competency"]:checked')).map(checkbox => checkbox.value).join(", ");

      // Update table row
      const rowIndex = row.getAttribute("data-index");
      const dateCell = table.rows[rowIndex].cells[0];
      const workCell = table.rows[rowIndex].cells[1];
      const knowledgeCell = table.rows[rowIndex].cells[2];
      const competencyCell = table.rows[rowIndex].cells[3];
      
      dateCell.textContent = date;
      workCell.textContent = work;
      knowledgeCell.textContent = knowledge;
      competencyCell.textContent = competencies;

      // reset form
      document.querySelector("#new-entry-form").reset();
      saveButton.remove();
      editForm.appendChild(sub);

      //reset heading
      const head = document.querySelector("#heading");
      head.textContent = "Input Data:";
    });

  

  });
  editCell.appendChild(editButton);

  // Reset form
  document.querySelector("#new-entry-form").reset();
}

function pageLoaded() {
  start();
}

function start() {
  const addButton = document.querySelector("#add-entry-button");
  addButton.addEventListener("click", addEntry);
}

pageLoaded();