import { newTask } from './task.js'

const loadPage = () => {
    activateTaskBtn();
}

const activateTaskBtn = () => {
    const btn = document.querySelector('.add-task');
    btn.addEventListener('click', appendTaskForm);
}

const appendTaskForm = () => {
    const div = document.createElement('div');
    div.innerHTML = 
    `<form>
        <input type="text" id="new-task-title" placeholder="Task name...">
        <input type="text" id="new-task-desc" placeholder="Description...">
        <label for="priority-choice">Priority</label>
        <select id="priority-choice">
            <option value="Low">Low</option>
            <option value="Med">Med</option>
            <option value="High">High</option>
        </select>
        <input type="date" id="due-date">
        <button type="button" id="submit-task">Add</button>
        <button id="cancel-task">Cancel</button>
    </form>`

    const taskList = document.querySelector('.task-list');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);

    activateFormBtns();
}

const activateFormBtns = () => {
    const submit = document.getElementById('submit-task');
    submit.addEventListener('click', addNewTask);

    const cancel = document.getElementById('cancel-task');
    cancel.addEventListener('click', removeTaskForm);
}

const addNewTask = () => {
    const details = getFormInfo();

    const task = newTask(...details);
}

const getFormInfo = () => {
    const title = document.getElementById('new-task-title').value;

    const description = document.getElementById('new-task-desc').value;

    const priority = document.getElementById('priority-choice').value;

    const date = document.getElementById('due-date').value;

    return [title, description, priority, date];
}


export { loadPage }