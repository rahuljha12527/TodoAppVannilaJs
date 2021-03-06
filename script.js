let taskInput = document.getElementById("new-task");

let addButton = document.getElementsByTagName("button")[0];

let incompleteTasksHolder = document.getElementById("incomplete-tasks");

let completeTasksHolder = document.getElementById("completed-tasks");


// create a new task
let createNewTaskElement = function (taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");

  let label = document.createElement("label");

  let editInput = document.createElement("input");

  let editButton = document.createElement("button");

  let deleteButton = document.createElement("button");

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

let addTask = function () {
  console.log("Add Task....");

  let listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTasksEvents(listItem, taskCompleted);
  taskInput.value = "";
};

let editTask = function () {
  console.log("Edit Task...");

  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");

  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
};

let deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  ul.removeChild(listItem);
};

let taskCompleted = function () {

    console.log("Task completed");
  let listItem = this.parentNode;
  console.log("task complete",listItem);
  completeTasksHolder.appendChild(listItem);
  bindTasksEvents(listItem, taskIncomplete);

};


let taskIncomplete=function(){


    let listItem=this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



addButton.addEventListener("click",addTask);


let bindTasksEvents=function(taskListItem,checkBoxEventHandler){
    console.log("Bind list item event");

    let checkBox=taskListItem.querySelector('input[type="checkbox"]');
    let editButton=taskListItem.querySelector('button.edit');
    let deleteButton=taskListItem.querySelector("button.delete");

    editButton.onclick=editTask;
    
    deleteButton.onclick=deleteTask;

    checkBox.onchange=checkBoxEventHandler;
}


//cycle over incompleteTaskHolder ul list items
for(let i=0;i<incompleteTasksHolder.children.length;i++){
    
    bindTasksEvents(incompleteTasksHolder.children[i],taskCompleted);
}

//cycle over completedTaskHolder ul list items
for(let i=0;i<completeTasksHolder.children.length;i++){
    bindTasksEvents(completeTasksHolder.children[i],taskIncomplete);
}





