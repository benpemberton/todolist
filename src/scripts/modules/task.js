import { getFormInfo } from './app.js';
import { projects } from './projects.js';
import { toDoList } from './todolist.js';

export default (function taskFunctions() {

    const newTask = (name, description, priority, dueDate, array) => {
        return {
            name,
            description,
            priority,
            dueDate,
            id: Date.now(),
            project: projects.getProjectName(array)
        }
       
    }

    const addToTaskArray = (array) => {
        const div = document.getElementById('task-form');
    
        const details = getFormInfo(div, '.form-input');
        
        const task = newTask(...details, array);
         
        array.push(task);
    }

    const getTaskFromArray = (div, array) => {
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