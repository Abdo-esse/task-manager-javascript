let tasks = [];
let countID = 5;
const addTaskBtn = document.querySelector("#btnCreate");


// Fetch tasks from JSON file and display them
async function loadTasks() {
  try {
    const response = await fetch("/tasks.json");
    tasks = await response.json();
    console.log(tasks);
    displayTasks();
  } catch (error) {
    console.error("Could not load tasks:", error);
  }
}

// Display tasks on the page
function displayTasks() {
  const taskList = document.getElementById("myList");
  taskList.innerHTML = ""; // Clear the task list

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.className =
      "list-group-item d-flex justify-content-between align-items-center"; // Bootstrap classes for styling list items

    taskElement.innerHTML = `
            <span class="${
              task.status === "complete" ? "text-decoration-line-through" : ""
            }">
                ${task.text}
            </span>
            <div>
                <button class="btn btn-${
                  task.status === "complete" ? "secondary" : "success"
                } btn-sm me-2" onclick="toggleStatus(${task.id})">
                    ${
                      task.status === "complete"
                        ? "Mark Incomplete"
                        : "Mark Complete"
                    }
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${
task.id})">Delete</button>
            </div>
        `;

    taskList.appendChild(taskElement);
  });
}


// Add a new task to the list
function addTask() {
  const taskInput = document.getElementById("txtItem");

  countID++;

  //Your code goes here
  const newTask = {
    id: countID,
    text: taskInput.value,
    status: "incomplete",
  };

  tasks.push(newTask);
 console.log(tasks);
 
  //keep these here please
  saveTasks();
  taskInput.value = "";
  displayTasks();
}

// Toggle task status between complete and incomplete
function toggleStatus(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = task.status === "complete" ? "incomplete" : "complete";
    saveTasks();
    displayTasks();
  }
}

// Delete a task from the list
function deleteTask(id) {
  // write the code to delete the task
const index = tasks.findIndex(e => e.id === id);
    console.log(index);
    
    
    
      tasks.splice(index, 1);

  //keep these here please
  saveTasks();
  displayTasks();
}

//keep these here please
// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//keep these here please
// Load tasks from local storage or JSON file on page load
window.onload = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
  } else {
    loadTasks();
  }
};

// Appel du function addTask
addTaskBtn.addEventListener("click", addTask);
