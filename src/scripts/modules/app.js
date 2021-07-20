import taskFunctions from './task.js'
import { toDoList } from './todolist.js'
import { projects } from './projects.js'
import { storage } from './storage.js'

// window.localStorage.clear();
// console.log(localStorage);

const loadPage = () => {
    if (localStorage.length > 0) {
        storage.retrieveTasks();
        populateProjectBtns();
        setCurrentBtn();
        const proj = getCurrentBtn();
        const projName = proj.id.split('-')[1];
        populateTaskWindow(projects[projName])
    } else {
        defaultStart();
    }

    activateTaskBtn();
    activateSideBtns();
    activateAddProjectBtn();
}

const defaultStart = () => {
    projects.general = [];

    populateProjectBtns();
    setCurrentBtn();
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

const hideAddTaskBtn = () => {
    const btn = document.querySelector('.add-task');
    
    btn.style.visibility = 'hidden';
}

const showAddTaskBtn = () => {
    const btn = document.querySelector('.add-task');
    
    btn.style.visibility = 'visible';
}

const activateFormBtns = () => {
    const submit = document.getElementById('submit-task');
    submit.addEventListener('click', addTaskBtnHandler);

    const cancel = document.getElementById('cancel-task');
    cancel.addEventListener('click', cancelTaskBtnHandler);
}

const addTaskBtnHandler = () => {
    const div = document.getElementById('task-form');
    
    if (checkTaskForm(div)) {
    
        const details = getFormInfo(div, '.form-input');

        const array = setCurrentArray();   
        
        const task = taskFunctions.newTask(...details, array);

        taskFunctions.addToTaskArray(task, array);

        storage.addTask(task);

        const index = array.length-1;

        appendNewTask(array, index);
    
        removeTaskForm();
        toggleAddTaskBtn();
    }
}

const cancelTaskBtnHandler = () => {
    removeTaskForm();
    toggleAddTaskBtn();
}

const checkTaskForm = (div) => {
    const elements = div.querySelectorAll('.form-input');

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

const removeTaskForm = () => {
    const div = document.getElementById('form-container');

    div.remove();
}

const appendNewTask = (array, index) => {     
    insertTaskName(array, index);    
    insertTaskDate(array, index);
}

const insertTaskName = (array, index) => {
    const div = document.createElement('div');
    
    div.classList.add('task-entry');

    div.dataset.id = array[index]['id'];

    div.innerHTML = 
    `<div class="task-details">
        <div class="task-entry-title">
        <input class="edit-details" readonly></input>
        </div>
        <div class="proj-tag">
        <span class="proj-name"></input>
        </div>
    </div>
    <div class="task-entry-icons">
        <i class="fas fa-plus"></i>
        <i class="far fa-edit"></i>
        <i class="far fa-trash-alt"></i>
    </div>`

    const nameInput = div.querySelector('.edit-details');

    nameInput.value = array[index]['name'];

    const globArray = setCurrentArray();

    if (globArray === toDoList) {
        const projName = div.querySelector('.proj-name');

        projName.textContent = `${array[index]['project']}`;
    }

    const taskList = document.querySelector('.task-list-window');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);

    activateTaskIcons(div);
}

const insertTaskDate = (array, index) => {
    const div = document.createElement('div');    
    div.classList.add('date-entry');
    div.dataset.id = array[index]['id'];

    div.innerHTML = `<input type="date" class="due-date 
        edit-details" readonly="">`;

    const date = div.querySelector('.due-date');
    date.value = array[index]['dueDate'];

    const taskList = document.querySelector('.task-list-window');

    const btn = document.querySelector('.add-task');

    taskList.insertBefore(div, btn);
}

const activateTaskIcons = (div) => {
    const plus = div.querySelector('.fa-plus');

    plus.addEventListener('click', toggleIconsHandler);

    const edit = div.querySelector('.fa-edit');

    edit.addEventListener('click', toggleIconsHandler);

    const trash = div.querySelector('.fa-trash-alt');

    trash.addEventListener('click', removeIconHandler);
}

const toggleIconsHandler = (e) => {
    const div = e.target.closest('.task-entry');

    const icon = e.target;

    const id = div.dataset.id;

    let array = setCurrentArray();

    if (array === toDoList) {
        const proj = div.querySelector('.proj-name').textContent;
        array = projects[proj];
    }

    const details = taskFunctions.getTaskFromArray(id, array);

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

        appendTaskDetails(details, icon);

    } else {

        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');

        minimiseTask(div, details);
    }
}

const minimiseTask = (div, details) => {
    const detailsDiv = div.querySelector('.append-details');

    detailsDiv.remove();

    const divs = document.querySelectorAll(`[data-id="${details.id}"]`);

    const saveBtn = div.querySelector('.save-btn');

    if (saveBtn) {
        toggleEditIcon(div);
        toggleReadOnly(divs);
        toggleEditHighlight(divs);
        removeSaveBtn(div);
    }
}

const appendTaskDetails = (details, icon) => {
    const elements = 
    `<textarea type="text" class="task-desc edit-details" 
        readonly></textarea>`;

    const parentDiv = icon.closest('.task-entry');

    const taskNameDiv = parentDiv.querySelector('.task-details');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('append-details');

    detailsDiv.innerHTML = elements;

    const description = detailsDiv.querySelector('.task-desc');
    description.value = details.description;

    taskNameDiv.appendChild(detailsDiv);

    autoHeight('.task-desc');
}

const autoHeight = (element) => {
    const el = document.querySelector(`${element}`);
    
    el.style.height = (el.scrollHeight) + 'px';
}

const editDetails = (div, details) => {
    const icon = div.querySelector('.fa-plus');

    if (!(div.querySelector('.append-details'))) {
        togglePlusIcon(details, icon, div);
    }   

    const divs = document.querySelectorAll(`[data-id="${details.id}"]`);

    toggleReadOnly(divs);
    toggleEditHighlight(divs);
    insertSaveBtn(div);

}

const toggleReadOnly = (divs) => {
    divs.forEach(div => {
        console.log(div);
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
    });
}

const toggleEditHighlight = (divs) => {
    divs.forEach(div => {
        const inputs = div.querySelectorAll('.edit-details');

        inputs.forEach(input => {
            if (input.classList.contains('edit-highlight')) {
                input.classList.remove('edit-highlight');
            } else {
                input.classList.add('edit-highlight');

            }
        });
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

const saveBtnHandler = (e) => {
    const div = e.target.closest('.task-entry');

    const id = div.dataset.id;

    const divs = document.querySelectorAll(`[data-id="${id}"]`);

    const projName = div.querySelector('.proj-name');

    let array = setCurrentArray();

    if (array === toDoList) {
        array = projects[projName.textContent];
    }

    const details = getFormInfo(divs, '.edit-details');

    removeSaveBtn(div);
    toggleEditIcon(div);

    taskFunctions.saveTaskInArray(id, details, array);
    storage.editTask(id, details, array);

    toggleReadOnly(divs);
    toggleEditHighlight(divs);
}

const removeSaveBtn = (div) => {
    const saveBtn = div.querySelector('.save-btn');

    if (saveBtn) {
        saveBtn.remove();
    }
}

const getFormInfo = (divs, selector) => {
    if (NodeList.prototype.isPrototypeOf(divs)) {
        const values = [];

        divs.forEach(div => {
            const elements = div.querySelectorAll(selector);

            elements.forEach(element => values.push(element.value));
        });
        return values;

    } else {
    
    const elements = divs.querySelectorAll(selector);

    const values = [];

    elements.forEach(element => values.push(element.value));

    return values;
    }
}

const toggleEditIcon = (div) => {
    const icon = div.querySelector('.fa-edit');

    if (icon.style.pointerEvents === 'none') {
        icon.style.pointerEvents = 'auto';
    } else {
        icon.style.pointerEvents = 'none';
    }
}

const removeIconHandler = (e) => {
    const div = e.target.closest('.task-entry');

    const id = div.dataset.id;

    const projName = div.querySelector('.proj-name');

    let array = setCurrentArray();

    if (array === toDoList) {
        array = projects[projName.textContent];
    }

    removeTaskAndDate(id);

    storage.deleteTask(id, array);

    taskFunctions.deleteFromArray(id, array);
}

const removeTaskAndDate = (id) => {
    const divs = document.querySelectorAll(`[data-id="${id}"]`);

    divs.forEach(div => div.remove());
}

const activateSideBtns = () => {
    const btns = document.querySelectorAll('.side-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', 
        sideBtnClicked);
    });
}

const sideBtnClicked = (e) => {
    if (e.target.nodeName == 'I') {
        return;
    } else {
        turnOffSideBtns();

        const currentBtn = e.currentTarget;

        currentBtn.classList.add('side-btn-active');

        clearTaskWindow();

        const array = setCurrentArray();

        if (currentBtn.id === 'display-all') {
            hideAddTaskBtn();
            populateTaskWindow(toDoList.displayAll());
        } else if (currentBtn.id === 'display-today') {
            hideAddTaskBtn();
            populateTaskWindow(toDoList.displayToday());
        } else if (currentBtn.id === 'display-week') {
            hideAddTaskBtn();
            populateTaskWindow(toDoList.displayWeek());
        } else {
            showAddTaskBtn();
            populateTaskWindow(array);
        }
    }
}

const clearTaskWindow = () => {
    const tasks = document.querySelectorAll('.task-entry');

    const dates = document.querySelectorAll('.date-entry');

    tasks.forEach(task => task.remove());

    dates.forEach(date => date.remove());

    const form = document.getElementById('form-container');

    if (form) {
        form.remove();
    }
}

const populateTaskWindow = (array) => {
    for (let i = 0; i < array.length; i++) {
        appendNewTask(array, i);
    }
}

const turnOffSideBtns = () => {
    const btns = document.querySelectorAll('.side-btn');

    btns.forEach(btn => {
        btn.classList.remove('side-btn-active');
    });
}

const setCurrentBtn = () => {
    const projBtns = document.querySelectorAll('.proj-btn');
    
    projBtns[0].classList.add('side-btn-active');
}

const getCurrentBtn = () => {
    const btn = document.querySelector('.side-btn-active');
    return btn;
}

const setCurrentArray = () => {
    if (getCurrentBtn().closest('.task-view-menu')) {
        return toDoList;
    } else {
        const project = getCurrentBtn().id.split('-')[1];

        return projects[project];
    }
}

const activateAddProjectBtn = () => {
    const btn = document.querySelector('.add-project');
    btn.addEventListener('click', addProjectBtnHandler);
}

const addProjectBtnHandler = () => {
    toggleAddProjectBtn();
    insertProjectForm();
}

const insertProjectForm = () => {
    const div = document.createElement('div');
    div.classList.add('project-form-box');

    div.innerHTML = 
    `<form id="project-form">
        <input type="text" id="new-project-title" class ="form-input" 
        placeholder="Project name...">
        <button type="button" id="cancel-project">Cancel</button>
        <button type="button" id="submit-project">Add</button>
    </form>`;

    const cancelBtn = div.querySelector('#cancel-project');
    cancelBtn.addEventListener('click', cancelProjectBtnHandler);

    const addBtn = div.querySelector('#submit-project');
    addBtn.addEventListener('click', submitProjectBtnHandler);

    const projectMenu = document.querySelector('.project-view-menu');

    const hiddenBtn = projectMenu.querySelector('.add-project');

    projectMenu.insertBefore(div, hiddenBtn);
}

const toggleAddProjectBtn = () => {
    const btn = document.querySelector('.add-project');

    btn.style.visibility === 'hidden'? btn.style.visibility 
    = 'visible': btn.style.visibility = 'hidden';
}

const cancelProjectBtnHandler = () => {
    removeProjectForm();
    toggleAddProjectBtn();
}

const removeProjectForm = () => {
    const formBox = document.querySelector('.project-form-box');

    formBox.remove();
}

const submitProjectBtnHandler = () => {
    const projDiv = document.querySelector('.project-form-box');

    if (projDiv.querySelector('.form-input').value !== '') {        
        let projName = getFormInfo(projDiv, '.form-input');

        projName = underscoreProjName(projName[0]);

        projects.newProject(projName);

        removeProjectForm();

        clearProjectBtns();

        populateProjectBtns();

        turnOffSideBtns();

        const currentBtn = document.querySelector
            (`#proj-${projName}`);
    
        currentBtn.classList.add('side-btn-active');
    
        clearTaskWindow();
    
        const array = setCurrentArray();

        showAddTaskBtn();

        populateTaskWindow(array);

        toggleAddProjectBtn();
    }
}

const clearProjectBtns = () => {
    const projDiv = document.querySelector('.project-view-menu');

    const btns = projDiv.querySelectorAll('.side-btn');

    btns.forEach(btn => btn.remove());
}

const populateProjectBtns = () => {
    const btnArray = projects.getProjectNames();

    const projDiv = document.querySelector('.project-view-menu');

    const hiddenBtn = projDiv.querySelector('.add-project');

    for (let i = 0; i < btnArray.length; i++) {
        const btn = document.createElement('button');
        btn.id = `proj-${btnArray[i]}`;
        btn.classList.add('side-btn');
        btn.classList.add('proj-btn');

        let nameUpper = descoreProjName(btnArray[[i]]);

        nameUpper = nameUpper.charAt(0).toUpperCase() + 
        nameUpper.slice(1);

        btn.innerHTML = 
            `<span>${nameUpper}</span>
            <div class="rem-icon-box">
            <i class="fas fa-times" aria-hidden="true"></i>
            </div>`;

        const icon = btn.querySelector('i');

        icon.addEventListener('click', removeProjectHandler);

        btn.addEventListener('click', sideBtnClicked);

        btn.addEventListener('mouseover', () => {
            icon.style.visibility = 'visible';
        });

        btn.addEventListener('mouseout', () => {
            icon.style.visibility = 'hidden';
        });

        projDiv.insertBefore(btn, hiddenBtn);
    }
}

const removeProjectHandler = (e) => {
    const btn = e.target.closest('.side-btn');

    const project = btn.id.split('-')[1];

    const index = projects.getProjIndex(project);

    delete projects[project];

    storage.deleteProject(project);

    if (btn.classList.contains('side-btn-active')) {
        const projNames = projects.getProjectNames();

        let newProj = projNames[index];

        if (index > projNames.length-1) {
            newProj = projNames[index-1];
        }

        btn.remove();

        clearTaskWindow();

        const btnArray = projects.getProjectNames();

        if (btnArray.length > 0) {
            const currentBtn = document.querySelector(`#proj-${newProj}`);
            currentBtn.classList.add('side-btn-active');
        
            const array = setCurrentArray();
        
            showAddTaskBtn();

            populateTaskWindow(array);
        } else {
            hideAddTaskBtn();
        }
    } else {
        btn.remove();
    }  
}

const underscoreProjName = (name) => {
    const parts = name.split(' ');

    if (parts.length > 1) {

        let scoredName = parts[0];

        for(let i = 1; i < parts.length; i++) {
            scoredName += ('_' + parts[i]);
        }

        return scoredName;
    } else {
        return name;
    }
}

const descoreProjName = (name) => {
    const parts = name.split('_');

    let spacedName = parts[0];
    
    for (let i = 1; i < parts.length; i++) {
        spacedName += (' ' + parts[i]);
    }
    
    return spacedName;
}

export { loadPage, getFormInfo, addTaskBtnHandler, 
    saveBtnHandler };