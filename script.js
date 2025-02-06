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

    let task = { text: taskText, deadline: deadline, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    taskInput.value = "";
    deadlineInput.value = "";
}

// Render Tasks
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("item");
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.text} ${task.deadline ? "- Deadline: " + task.deadline : ""}</span>
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteTask(${index})">✖</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Toggle Task Completion
function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add Goal
function addGoal() {
    let goalInput = document.getElementById("goalInput");
    let goalText = goalInput.value.trim();

    if (goalText === "") {
        alert("Goal cannot be empty!");
        return;
    }

    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(goalText);
    localStorage.setItem("goals", JSON.stringify(goals));

    renderGoals();
    goalInput.value = "";
}

// Render Goals
function renderGoals() {
    let goalList = document.getElementById("goalList");
    goalList.innerHTML = "";
    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    goals.forEach((goal, index) => {
        let goalItem = document.createElement("div");
        goalItem.classList.add("item");
        goalItem.innerHTML = `
            <span>${goal}</span>
            <button onclick="deleteGoal(${index})">✖</button>
        `;
        goalList.appendChild(goalItem);
    });
}

// Delete Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
}

// Load Data from Local Storage
function loadData() {
    renderTasks();
    renderGoals();
}

