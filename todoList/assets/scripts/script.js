const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addInList);
const taskField = document.getElementById("add-task-field");
const categoryField = document.getElementById("category");
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

  if (addedTask === "") {
    errorEl.innerText = "Cannot add empty task!";
  } else {
    const taskNameElements = document.getElementsByClassName("task-name");
    if (checkExistingTask(addedTask, taskNameElements)) {
      taskField.value = "";
      errorEl.innerText = "Task already exists!";
    } else {
      errorEl.innerText = "";
      let ulEl = document.querySelector(".task-list ul");
      const listLiEl = document.createElement("li");
      listLiEl.setAttribute("class", "list-Row");
      listLiEl.style.display = "flex";
      listLiEl.style.justifyContent = "space-between";
      listLiEl.style.alignItems = "baseline";
      const listLiSpanFields = document.createElement("span");
      listLiEl.appendChild(listLiSpanFields);
      listLiSpanFields.style.maxWidth = "40%";
      const listLiSpanEl = document.createElement("span");
      listLiSpanFields.appendChild(listLiSpanEl);
      listLiSpanEl.setAttribute("class", "task-name");
      ulEl.appendChild(listLiEl);
      listLiSpanEl.innerText = addedTask;
      listLiSpanEl.title = addedTask;

      const listLiSpanE2 = document.createElement("span");
      listLiSpanFields.appendChild(listLiSpanE2);
      listLiSpanE2.setAttribute("class", "category-name");
      // listLiEl.appendChild(listLiSpanE2);
      listLiSpanE2.innerText = ` (${category})   `;

      const listLiSpanButtons = document.createElement("span");
      listLiEl.appendChild(listLiSpanButtons);
      const listLiSpanE3 = document.createElement("span");
      listLiSpanButtons.appendChild(listLiSpanE3);
      const listSpanDone = document.createElement("button");
      listSpanDone.setAttribute("class", "done-button");
      listSpanDone.addEventListener("click", deleteInList);

      listLiSpanE3.appendChild(listSpanDone);
      listSpanDone.innerText = "Done";
      listSpanDone.style.marginRight = "10px";

      const listLiSpanE4 = document.createElement("span");
      listLiSpanButtons.appendChild(listLiSpanE4);
      const listSpanEdit = document.createElement("button");
      listSpanEdit.setAttribute("class", "edit-button");
      listSpanEdit.addEventListener("click", editInList);

      listLiSpanE4.appendChild(listSpanEdit);
      // listLiEl.appendChild(listLiSpanE4);
      listSpanEdit.innerText = "Edit";
      taskField.value = "";
    }
  }
}

const doneButton = document.getElementsByClassName("done-button");

function deleteInList(e) {
  const listRow = e.target.closest(".list-Row");
  listRow.remove();
}

const editButton = document.getElementsByClassName("edit-button");

function editInList(e) {
  const listRow = e.target.closest(".list-Row");
  const taskNameEl = listRow.querySelector(".task-name");
  const categoryEl = listRow.querySelector(".category-name");

  // Create edit div
  const editDiv = document.createElement("div");
  editDiv.classList.add("edit-container");

  // Input field for task
  const editTask = document.createElement("input");
  editTask.type = "text";
  editTask.value = taskNameEl.innerText;
  editDiv.appendChild(editTask);

  // Dropdown for category
  const editCategory = document.createElement("select");
  editDiv.appendChild(editCategory);

  const options = [
    "General",
    "Shopping",
    "Family",
    "Office",
    "Vaccation",
    "Today",
    "Grocery",
    "Important",
    "Other",
  ];

  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.toLowerCase();
    option.textContent = item;
    if (categoryEl.innerText.toLowerCase().includes(item.toLowerCase())) {
      option.selected = true;
    }
    editCategory.appendChild(option);
  });

  // Save button
  const saveChangesButton = document.createElement("button");
  saveChangesButton.innerText = "Save changes";
  saveChangesButton.classList.add("changes-button");
  editDiv.appendChild(saveChangesButton);

  // Replace the row content with the edit form
  listRow.style.display = "none";
  listRow.after(editDiv);

  // When user clicks "Save changes"
  saveChangesButton.addEventListener("click", function () {
    const newTaskName = editTask.value.trim();
    const newCategory = editCategory.value;

    if (newTaskName === "") {
      alert("Task name cannot be empty!");
      return;
    }

    // Update original elements
    taskNameEl.innerText = newTaskName;
    categoryEl.innerText = ` (${newCategory})`;

    // Restore view
    editDiv.remove();
    listRow.style.display = "flex";
  });
}
