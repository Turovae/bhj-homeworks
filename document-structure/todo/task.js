const taskForm = document.getElementById('tasks__form');
const taskList = document.getElementById('tasks__list');

const createTask = (text, container) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = `
        <div class="task__title">
            ${text}
        </div>
        <a href="#" class="task__remove">&times;</a>
    `;

    container.appendChild(task);
    
    task.addEventListener('click', (event) => {
        const delButton = event.target.closest('.task__remove');
        if(!delButton) return;
        event.preventDefault();
        task.remove();
        localStorage.removeItem(text);
    });

    localStorage.setItem(text, text);
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskInput = taskForm.querySelector('#task__input');
    const text = taskInput.value;
    taskInput.value = '';
    
    if (!text) return;

    createTask(text, taskList);

});

window.addEventListener('load', () => {
    for (let i = 0; i < localStorage.length; i++) {
        createTask(localStorage.key(i), taskList);
    }
})