document.addEventListener("DOMContentLoaded", loadData);

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

// Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("deadlineInput");
    let taskText = taskInput.value.trim();
    let deadline = deadlineInput.value;

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let taskItem = document.createElement("div");
    taskItem.classList.add("item");

    taskItem.innerHTML = `
        <span>${taskText} - ${deadline ? "Deadline: " + deadline : ""}</span>
        <button onclick="completeTask(this)">✔</button>
        <button onclick="deleteTask(this)">✖</button>
    `;

    taskList.appendChild(taskItem);
    saveData();
    taskInput.value = "";
    deadlineInput.value = "";
}

// Complete Task
function completeTask(button) {
    let taskItem = button.parentElement;
    taskItem.classList.toggle("completed");
    saveData();
}

// Delete Task
function deleteTask(button) {
    button.parentElement.remove();
    saveData();
}

// Add Goal
function addGoal() {
    let goalInput = document.getElementById("goalInput");
    let goalText = goalInput.value.trim();

    if (goalText === "") {
        alert("Goal cannot be empty!");
        return;
    }

    let goalList = document.getElementById("goalList");
    let goalItem = document.createElement("div");
    goalItem.classList.add("item");

    goalItem.innerHTML = `
        <span>${goalText}</span>
        <button onclick="deleteGoal(this)">✖</button>
    `;

    goalList.appendChild(goalItem);
    saveData();
    goalInput.value = "";
}

// Delete Goal
function deleteGoal(button) {
    button.parentElement.remove();
    saveData();
}

// Save Data to Local Storage
function saveData() {
    let tasks = document.getElementById("taskList").innerHTML;
    let goals = document.getElementById("goalList").innerHTML;
    localStorage.setItem("tasks", tasks);
    localStorage.setItem("goals", goals);
}

// Load Data from Local Storage
function loadData() {
    document.getElementById("taskList").innerHTML = localStorage.getItem("tasks") || "";
    document.getElementById("goalList").innerHTML = localStorage.getItem("goals") || "";
}
