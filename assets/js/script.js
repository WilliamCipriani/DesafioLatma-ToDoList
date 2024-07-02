let tasks = [
    { id: 1, description: 'Tarea 1', completed: false },
    { id: 2, description: 'Tarea 2', completed: false },
    { id: 3, description: 'Tarea 3', completed: false }
];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.description;
        taskItem.className = task.completed ? 'completed' : '';

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => deleteTask(task.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        taskButtons.appendChild(checkbox);
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskButtons);

        taskList.appendChild(taskItem);
    });

    updateCounters();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            description: taskDescription,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function updateCounters() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

document.addEventListener('DOMContentLoaded', renderTasks);
