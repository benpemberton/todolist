import { newTask } from './task.js'
import { toDoList } from './todolist.js'
import { projects } from './projects.js'

const loadPage = () => {
    activateTaskBtn();
    activateSideBtns();
}

const activateTaskBtn = () => {
    const btn = document.querySelector('.add-task');
    btn.addEventListener('click', appendTaskForm);
}

const activateSideBtns = () => {
    const btns = document.querySelectorAll('.side-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', sideBtnHandler);
    });
}

const sideBtnHandler = (e) => {
    turnOffOtherBtns();

    e.currentTarget.classList.add('side-btn-active');

    clearProjectWindow();

    if (e.currentTarget.closest('.task-view-menu')) {
        console.log('yep');
    } else {
        showProjectTasks(e);
    }
}

const showProjectTasks = (e) => {
    const project = e.currentTarget.id.split('-')[1];


}

const populateTaskWindow = (array) => {

}

const clearProjectWindow = () => {
    const tasks = document.querySelectorAll('.task-entry');

    const dates = document.querySelectorAll('.date-entry');

    tasks.forEach(task => task.remove());

    dates.forEach(date => date.remove());
}

const turnOffOtherBtns = () => {
    const btns = document.querySelectorAll('.side-btn');

    btns.forEach(btn => {
        btn.classList.remove('side-btn-active');
    });
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

    const taskList = document.querySelector('.task-list-window');

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

const getFormInfo = (div, selector) => {
    const elements = div.querySelectorAll(selector);

    const values = [];

    elements.forEach(element => values.push(element.value));

    return values;
}

const addTaskBtnHandler = () => {
    if (checkTaskForm()) {
            const sideBtn = getCurrentBtn();

        if (sideBtn.closest('.task-view-menu')) {
            const array = toDoList;
        
            addToTaskArray(array);

            const index = array.length-1;

            appendNewTask(array, index);

            console.log(array);
            console.log(index);
        } else {
            const currentProj = sideBtn.id.split('-')[1];

            const array = projects[currentProj];

            addToTaskArray(array);

            const index = array.length-1;
            
            appendNewTask(array, index);
        } 

    removeTaskForm();
    toggleAddTaskBtn();
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

const addToTaskArray = (array) => {
    const div = document.getElementById('task-form');

    const details = getFormInfo(div, '.form-input');

    const task = newTask(...details);
     
    array.push(task);
}

const getCurrentBtn = () => {
    const btn = document.querySelector('.side-btn-active');
    return btn;
}

const appendNewTask = (array, index) => {     
    insertTaskName(array, index);    
    insertTaskDate(array, index);
}

const insertTaskName = (array, index) => {
    console.log(index);
    const div = document.createElement('div');
    
    div.classList.add('task-entry');

    div.dataset.id = array[index]['id'];

    div.innerHTML = 
    `<div class="comp-status-div">
    <input type="radio" class="comp-status">
    </div>
    <div class="task-details">
    <div class="task-entry-title">
    <input class="edit-details" readonly></input>
    </div>
    </div>
    <div class="task-entry-icons">
    <i class="fas fa-plus"></i>
    <i class="far fa-edit"></i>
    <i class="far fa-trash-alt"></i>
    </div>`

    const nameInput = div.querySelector('.edit-details');

    nameInput.value = array[index]['name'];

    const taskList = document.querySelector('.task-list-window');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);

    activateTaskIcons(div);
}

const insertTaskDate = (array, index) => {
    const div = document.createElement('div');    
    div.classList.add('date-entry');
    div.dataset.id = array[index]['id'];

    const span = document.createElement('span')
    span.textContent = array[index]['dueDate'];

    div.appendChild(span);

    const taskList = document.querySelector('.task-list-window');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);
}

const activateTaskIcons = (div) => {
    const plus = div.querySelector('.fa-plus');

    plus.addEventListener('click', toggleIconsHandler);

    const edit = div.querySelector('.fa-edit');

    edit.addEventListener('click', toggleIconsHandler);

    // const trash = document.querySelector('.fa-trash-alt');

    // trash.addEventListener('click', removeIconHandler);
}

const toggleIconsHandler = (e) => {
    const div = e.target.closest('.task-entry');

    const icon = e.target;

    const details = getTaskFromArray(div);

    if ((icon.classList.contains('fa-plus')) || 
    (icon.classList.contains('fa-minus'))) {

        togglePlusIcon(details, icon, div);

    } else if (icon.classList.contains('fa-edit')) {

        editDetails(div, details);

    }
}

const togglePlusIcon = (details, icon, div) => {
    if (icon.classList.contains('fa-plus')) {

        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');

        expandTask(details, icon);

    } else {

        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');

        minimiseTask(div);
    }
}

const editDetails = (div, details) => {
    const icon = div.querySelector('.fa-plus');

    if (!(div.querySelector('.append-details'))) {
        togglePlusIcon(details, icon, div);
    }   

    toggleReadOnly(div);
    toggleEditHighlight(div);
    insertSaveBtn(div);

}

const toggleReadOnly = (div) => {
    const inputs = div.querySelectorAll('.edit-details');

    inputs.forEach(input => {
        if (input.readOnly || input.disabled) {
            input.readOnly = false;
            input.disabled = false;
        } else {
            input.readOnly = true
            input.disabled = true;
        }
    });
}

const toggleEditHighlight = (div) => {
    const inputs = div.querySelectorAll('.edit-details');

    inputs.forEach(input => {
        if (input.classList.contains('edit-highlight')) {
            input.classList.remove('edit-highlight');
        } else {
            input.classList.add('edit-highlight');

        }
    });
}

const insertSaveBtn = (div) => {
    const btn = document.createElement('button');
    btn.classList.add('save-btn');
    btn.textContent = 'Save';

    btn.addEventListener('click', saveBtnHandler);

    div.appendChild(btn);

    toggleEditIcon(div);
}

const toggleEditIcon = (div) => {
    const icon = div.querySelector('.fa-edit');

    if (icon.style.pointerEvents === 'none') {
        icon.style.pointerEvents = 'auto';
    } else {
        icon.style.pointerEvents = 'none';
    }
}

const removeSaveBtn = (div) => {
    const saveBtn = div.querySelector('.save-btn');

    if (saveBtn) {
        saveBtn.remove();
    }
}

const saveBtnHandler = (e) => {
    const div = e.target.closest('.task-entry');

    removeSaveBtn(div);
    toggleEditIcon(div);
    saveTaskInArray(div, getFormInfo(div, '.edit-details'));
    toggleReadOnly(div);
    toggleEditHighlight(div);
}

const saveTaskInArray = (div, details) => {
    const id = div.dataset.id;

    const index = toDoList.findIndex(obj => {

        for (const prop in obj) {
            if (obj[prop] == id) {
                return true;
            }
        }
    });

    const detailsObj = {
        name: details[0],
        description: details[1],
        priority: details[2],
        dueDate: details[3]
    }

    const task = toDoList[index];

    for (const prop in detailsObj) {
        task[prop] = detailsObj[prop]
    }
   
    console.log(task);
}

const expandTask = (details, icon) => {  
    appendTaskDetails(details, icon);
}

const minimiseTask = (div) => {
    const detailsDiv = div.querySelector('.append-details');

    detailsDiv.remove();

    const saveBtn = div.querySelector('.save-btn');

    if (saveBtn) {
        toggleEditIcon(div);
        toggleReadOnly(div);
        toggleEditHighlight(div);
        removeSaveBtn(div);
    }
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
    return task;
}

const appendTaskDetails = (details, icon) => {
    console.log(details);

    const elements = 
    `<textarea type="text" class="task-desc edit-details" readonly></textarea>
    <select class="priority-choice edit-details" disabled>
        <option value="Low">Low</option>
        <option value="Med">Med</option>
        <option value="High">High</option>
    </select>
    <input type="date" class="due-date edit-details" readonly>
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