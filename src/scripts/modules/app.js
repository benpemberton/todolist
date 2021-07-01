import { newTask } from './task.js'
import { toDoList } from './todolist.js'

const loadPage = () => {
    activateTaskBtn();
}

const activateTaskBtn = () => {
    const btn = document.querySelector('.add-task');
    btn.addEventListener('click', appendTaskForm);
}

const appendTaskForm = () => {
    toggleAddTaskBtn();

    const div = document.createElement('div');
    div.id = 'form-container'; 

    div.innerHTML = 
    `<form id="task-form">
        <input type="text" id="new-task-title" class ="form-input" 
        placeholder="Task name...">
        <input type="text" id="new-task-desc" class="form-input"
        placeholder="Description...">
        <div id="pri-date-row">
        <label for="priority-choice" id="priority-label">Priority:
        </label>
        <select id="priority-choice" class="form-input">
            <option value="Low">Low</option>
            <option value="Med">Med</option>
            <option value="High">High</option>
        </select>
        <label for="due-date" id="date-label">Due date:
        </label>
        <input type="date" id="due-date" class="form-input">
        </div>
        <button type="button" id="cancel-task">Cancel</button>
        <button type="button" id="submit-task">Add</button>
    </form>`

    const taskList = document.querySelector('.task-list');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);

    activateFormBtns();
}

const toggleAddTaskBtn = () => {
    const btn = document.querySelector('.add-task');

    btn.style.visibility === 'hidden'? btn.style.visibility 
    = 'visible': btn.style.visibility = 'hidden';
}

const removeTaskForm = () => {
    const div = document.getElementById('form-container');

    div.remove();
}

const activateFormBtns = () => {
    const submit = document.getElementById('submit-task');
    submit.addEventListener('click', addTaskBtnHandler);

    const cancel = document.getElementById('cancel-task');
    cancel.addEventListener('click', cancelTaskBtnHandler);
}

const getFormInfo = () => {
    const elements = document.querySelectorAll('.form-input');

    const values = [];

    elements.forEach(element => values.push(element.value));

    return values;
}

const addTaskBtnHandler = () => {
    if (checkTaskForm()) {

        addToTaskArray();
        removeTaskForm();
        toggleAddTaskBtn();
        appendNewTask();
    
    }
}

const checkTaskForm = () => {
    const elements = document.querySelectorAll('.form-input');

    const status = []

    elements.forEach(element => {
        if (element.value === '') {
            status.push(false);
        }
    });
    
    if (status.length === 0) {
        return true;
    }
}

const cancelTaskBtnHandler = () => {
    removeTaskForm();
    toggleAddTaskBtn();
}

const addToTaskArray = () => {
    const details = getFormInfo();

    const task = newTask(...details);

    toDoList.push(task);
}

const appendNewTask = () => {
    insertTaskName();
    insertTaskDate();
}

const insertTaskName = () => {
    const div = document.createElement('div');
    
    div.classList.add('task-entry');

    div.dataset.id = toDoList[toDoList.length-1]['id'];

    div.innerHTML = 
    `<div class="comp-status-div">
    <input type="radio" class="comp-status">
    </div>
    <div class="task-details">
    <div class="task-entry-title">
    <span></span>
    </div>
    </div>
    <div class="task-entry-icons">
    <i class="fas fa-plus"></i>
    <i class="far fa-edit"></i>
    <i class="far fa-trash-alt"></i>
    </div>`

    const span = div.querySelector('span');

    span.textContent = toDoList[toDoList.length-1]['name'];

    const taskList = document.querySelector('.task-list');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);

    activateTaskIcons();
}

const insertTaskDate = () => {
    const div = document.createElement('div');    
    div.classList.add('date-entry');

    const span = document.createElement('span')
    span.textContent = toDoList[toDoList.length-1]['dueDate'];

    div.appendChild(span);

    const datesList = document.querySelector('.date-list');

    datesList.appendChild(div);
}

const activateTaskIcons = () => {
    const plus = document.querySelector('.fa-plus');

    plus.addEventListener('click', togglePlusIcon);

    const edit = document.querySelector('.fa-edit');

    // edit.addEventListener('click', editDetails);

    // const trash = document.querySelector('.fa-trash-alt');

    // trash.addEventListener('click', removeIconHandler);
}

const togglePlusIcon = (e) => {
    const div = e.target.closest('.task-entry');

    const icon = div.querySelector('i');

    if (icon.classList.contains('fa-plus')) {

        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');

        expandTask(div, icon);

    } else {

        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');

        minimiseTask();
    }
}

const expandTask = (div, icon) => {  
    const details = getTaskFromArray(div);

    appendTaskDetails(details, icon);



}

const getTaskFromArray = (div) => {
    const id = div.dataset.id;

    const task = toDoList.find(obj => {

        for (const prop in obj) {
            
            if (obj[prop] == id) {
                return obj;
            }
        }
    });

    console.log(task);
    return task;
}

const appendTaskDetails = (details, icon) => {
    const elements = 
    `<textarea type="text" class="task-desc" readonly></textarea>
    <select class="priority-choice" disabled>
        <option value="Low">Low</option>
        <option value="Med">Med</option>
        <option value="High">High</option>
    </select>
    <input type="date" class="due-date" readonly>
    </input>`;

    const parentDiv = icon.closest('.task-entry');

    const taskNameDiv = parentDiv.querySelector('.task-details');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('append-details');

    detailsDiv.innerHTML = elements;

    const description = detailsDiv.querySelector('.task-desc');
    description.value = details.description;

    const priority = detailsDiv.querySelector('.priority-choice');
    priority.value = details.priority;

    const date = detailsDiv.querySelector('.due-date');
    date.value = details.dueDate;

    taskNameDiv.appendChild(detailsDiv);

    autoHeight('.task-desc');


        
}

const autoHeight = (element) => {
    const el = document.querySelector(`${element}`);
    
    el.style.height = (el.scrollHeight) + 'px';
}




export { loadPage }