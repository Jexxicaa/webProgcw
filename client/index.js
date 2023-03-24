
function addEntry(event) {
    event.preventDefault();
    console.log("addEntry function called"); // Check if the function is being called
    
    // Gets whatever is inputted into the text boxes
    const { date, work, knowledge, competency } = getMessageDetails();

    // Creates a new row for the table
    const table = document.querySelector("#diary");
    const newRow = table.insertRow(-1);
    
    

    // Add data to new row
    const dateCell = newRow.insertCell(0);
    const workCell = newRow.insertCell(1);
    const knowledgeCell = newRow.insertCell(2);
    const competencyCell = newRow.insertCell(3);
    const editCell = newRow.insertCell(4);

    dateCell.textContent = date;
    workCell.textContent = work;
    knowledgeCell.textContent = knowledge;
    competencyCell.textContent = competency;


    
    //create the edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      // Navigate to the edit message page
      window.location.href = "editMessage.html";
    });
    // Add the edit button to the edit cell
    editCell.appendChild(editButton);



    // Clears the type boxes after submitting
    document.querySelector("#new-entry-form").reset();
  }


function getMessageDetails() {
    const date = document.querySelector("#date-input").value;
    const work = document.querySelector("#work-input").value;
    const knowledge = document.querySelector("#knowledge-input").value;
    const competency = document.querySelector("#competency-input").value;
    return { date, work, knowledge, competency };
}


function pageLoaded() {
  start();
}

function start() {
  const addButton = document.querySelector("#add-entry-button");
  addButton.addEventListener("click", addEntry);
}
pageLoaded();