const form = document.getElementById('todo-form');
const container = document.getElementById('task-container');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    container.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        
        card.innerHTML = `
            <h3>${task.name}</h3>
            <p>Категорія: ${task.category}</p>
            <p class="time">Створено: ${task.time}</p>
            <button class="delete-btn" onclick="deleteTask(${index})">Видалити</button>
        `;
        
        container.appendChild(card);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('task-name').value;
    const category = document.getElementById('task-category').value;
    
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ":" + 
                       now.getMinutes().toString().padStart(2, '0');

    const newTask = {
        name: name,
        category: category,
        time: timeString
    };

    tasks.push(newTask);
    saveAndRender();
    form.reset();
});

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveAndRender();
};

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();