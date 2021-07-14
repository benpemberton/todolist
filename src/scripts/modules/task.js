import { array, getFormInfo } from './app.js';
import { projects } from './projects.js';
import { toDoList } from './todolist.js';

export default (function taskFunctions() {

    const newTask = (name, description, priority, dueDate, array) => {
        const obj = Object.create(proto);

        obj.name = name
        obj.description = description
        obj.priority = priority
        obj.dueDate = dueDate
        obj.id = Date.now();
        obj.project = projects.getProjectName(array);

        return obj;
    }

    const proto = {
        sayHello() {

        }
    }

    const addToTaskArray = (array) => {
        const thing = toDoList;
        console.log(thing);
        const div = document.getElementById('task-form');
    
        const details = getFormInfo(div, '.form-input');
        
        const task = newTask(...details, array);
         
        array.push(task);

        if (array !== toDoList) {
            toDoList.push(task);
        }
    }

    const getTaskFromArray = (div) => {
        const id = div.dataset.id;

        const task = array.find(obj => {

            for (const prop in obj) {
                
                if (obj[prop] == id) {
                    return obj;
                }
            }
        });
        return task;
    }

    const saveTaskInArray = (div, details) => {
        const id = div.dataset.id;
    
        const index = array.findIndex(obj => {
    
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
    
        const task = array[index];
        
        for (const prop in detailsObj) {
            task[prop] = detailsObj[prop];
        }
    }

    const deleteFromArray = (div, array) => {
        const id = div.dataset.id;
    
        const index = array.findIndex(obj => {
    
            for (const prop in obj) {
                if (obj[prop] == id) {
                    return true;
                }
            }
        });

        array.splice(index, 1);
    }

    return { newTask, addToTaskArray, getTaskFromArray, 
        saveTaskInArray, deleteFromArray }
})();