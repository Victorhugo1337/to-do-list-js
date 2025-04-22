const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
    loadTasks();
};

function addTask() {
    if (taskInput.value.trim() === "") return;

    const task = {
        text: taskInput.value,
        completed: false,
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    const tasks = getTasks();
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = \`
            <span onclick="toggleTask(${index})">\${task.text}</span>
            <button onclick="deleteTask(${index})">Excluir</button>
        \`;
        taskList.appendChild(li);
    });
}
