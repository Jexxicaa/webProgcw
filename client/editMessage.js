function getMessageEditDetails() {
    const date = document.querySelector("#date-input").value;
    const work = document.querySelector("#work-input").value;
    const knowledge = document.querySelector("#knowledge-input").value;
    const competency = document.querySelector("#competency-input").value;
    return { date, work, knowledge, competency };
}
   
   
   function editEntry(){
    const { date, work, knowledge, competency } = getMessageEditDetails();
   
    //update with the new data

    row.cells[0].textContent = date;
    row.cells[1].textContent = work;
    row.cells[2].textContent = knowledge;
    row.cells[3].textContent = competency;
}
   
   //create the editEntry button
   const editEn = document.createElement("button");
   editEn.textContent = "Edit Entry";
   editEn.addEventListener("click", editEntry);

