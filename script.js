const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const priority = document.getElementById("priority-select").value;
    const dueDate = document.getElementById("due-date").value;
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span class="${priority}">${inputBox.value} <span class="due-date">${dueDate}</span></span>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close button
        li.appendChild(span);
    }
    inputBox.value = "";
    document.getElementById("due-date").value = ""; // Clear the date input
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const taskText = e.target.firstChild.textContent;
        const newTaskText = prompt("Edit your task:", taskText);
        if (newTaskText) {
            e.target.firstChild.innerHTML = `${newTaskText} <span class="due-date">${e.target.querySelector('.due-date').textContent}</span>`;
            saveData();
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || ''; // Added fallback to avoid null
}

function filterTasks(status) {
    const tasks = listContainer.getElementsByTagName("li");
    for (let task of tasks) {
        if (status === 'all') {
            task.style.display = 'flex';
        } else if (status === 'completed' && !task.classList.contains('checked')) {
            task.style.display = 'none';
        } else if (status === 'pending' && task.classList.contains('checked')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    }
}

function clearCompleted() {
    const tasks = listContainer.getElementsByTagName("li");
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].classLis
