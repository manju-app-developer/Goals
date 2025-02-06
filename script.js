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
    let priorityInput = document.getElementById("priorityInput");

    let taskText = taskInput.value.trim();
    let deadline = deadlineInput.value;
    let priority = priorityInput.value;

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = { text: taskText, deadline: deadline, priority: priority, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    
    saveTasks(tasks);
    taskInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "Medium";
}

// Render Tasks
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Sort tasks by deadline
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("item");
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.text} - <b>${task.priority}</b> ${task.deadline ? " (Deadline: " + task.deadline + ")" : ""}</span>
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="editTask(${index})">✏</button>
            <button onclick="deleteTask(${index})">✖</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Toggle Task Completion
function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
}

// Edit Task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks(tasks);
    }
}

// Delete Task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
}

// Save Tasks
function saveTasks(tasks) {
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
    
    saveGoals(goals);
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
            <button onclick="editGoal(${index})">✏</button>
            <button onclick="deleteGoal(${index})">✖</button>
        `;
        goalList.appendChild(goalItem);
    });
}

// Edit Goal
function editGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    let newText = prompt("Edit goal:", goals[index]);
    if (newText) {
        goals[index] = newText;
        saveGoals(goals);
    }
}

// Delete Goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.splice(index, 1);
    saveGoals(goals);
}

// Save Goals
function saveGoals(goals) {
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
}

// Search Tasks
function searchTasks() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    renderTasks();
}

// Load Data
function loadData() {
    renderTasks();
    renderGoals();
    checkReminders();
}

// Check Reminders
function checkReminders() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let now = new Date();
    tasks.forEach(task => {
        if (task.deadline && new Date(task.deadline) - now < 86400000 && !task.completed) {
            alert(`Reminder: Task "${task.text}" is due soon!`);
        }
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
