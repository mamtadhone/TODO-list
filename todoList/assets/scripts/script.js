const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addInList);
const taskField = document.getElementById("add-task-field");
const errorEl = document.getElementById("error");

function checkExistingTask(addedTask, taskNameElements) {
  if (taskNameElements.length === 0) return false;
  for (let i = 0; i < taskNameElements.length; i++) {
    if (taskNameElements[i].innerText === addedTask) return true;
  }
}
function addInList() {
  const addedTask = document.getElementById("add-task-field").value;
  const category = document.getElementById("category").value;
  // console.log(category);

  if (addedTask === "") {
    errorEl.innerText = "Cannot add empty task!";
  } else {
    const taskNameElements = document.getElementsByClassName("task-name");
    if (checkExistingTask(addedTask, taskNameElements)) {
      errorEl.innerText = "Task alraedy exists";
    } else {
      errorEl.innerText = "";
      let ulEl = document.querySelector(".task-list ul");
      const listLiEl = document.createElement("li");
      listLiEl.setAttribute("class", "list-Row");
      const listLiSpanEl = document.createElement("span");
      listLiSpanEl.setAttribute("class", "task-name");
      ulEl.appendChild(listLiEl);
      listLiEl.appendChild(listLiSpanEl);
      listLiSpanEl.innerText = addedTask;

      const listLiSpanE2 = document.createElement("span");
      listLiSpanE2.setAttribute("class", "category-name");
      listLiEl.appendChild(listLiSpanE2);
      listLiSpanE2.innerText = ` (${category})   `;

      const listLiSpanE3 = document.createElement("span");
      const listSpanDone = document.createElement("button");
      listSpanDone.setAttribute("class", "done-button");
      listSpanDone.addEventListener("click", deleteInList);

      listLiSpanE3.appendChild(listSpanDone);
      listLiEl.appendChild(listLiSpanE3);
      listSpanDone.innerText = "Done";

      const listLiSpanE4 = document.createElement("span");
      const listSpanEdit = document.createElement("button");
      listSpanEdit.setAttribute("class", "edit-button");
      listSpanEdit.addEventListener("click", editInList);

      listLiSpanE4.appendChild(listSpanEdit);
      listLiEl.appendChild(listLiSpanE4);
      listSpanEdit.innerText = "Edit";
      // console.log(listLiEl);
      // console.log(listLiSpanEl);
      taskField.value = "";
    }
  }
}

const doneButton = document.getElementsByClassName("done-button");

function deleteInList(e) {
  const listRow = e.target.parentElement.parentElement;
  listRow.remove();
}

const editButton = document.getElementsByClassName("edit-button");

function editInList(e) {
  const listRow = e.target;
  const editDiv = document.createElement("div");
  const editTask = document.createElement("input");
  editDiv.appendChild(editTask);
  editTask.setAttribute("type", "text");
  editTask.setAttribute("id", "editTask");
  editTask.setAttribute("placeholder", "Type your task here");
  // listRow.after(editTask);

  const editCategory = document.createElement("select");
  editDiv.appendChild(editCategory);
  editCategory.setAttribute("name", "category");
  editCategory.setAttribute("id", "editCategory");

  listRow.after(editDiv);

  const saveChangesButton = document.createElement("button");
  editDiv.appendChild(saveChangesButton);
  saveChangesButton.setAttribute("class", "changes-button");
  saveChangesButton.innerText = "Save changes";
  saveChangesButton.addEventListener("click", changeInList);
  function changeInList() {
    addedTask = document.getElementById("editTask").value;
    category = document.getElementById("editCategory").value;
  }
}
