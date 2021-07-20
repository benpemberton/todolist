import { getFormInfo } from './app.js';
import { projects } from './projects.js';
import { toDoList } from './todolist.js';

export default (function taskFunctions() {

    const newTask = (name, description, dueDate, array) => {
        return {
            name,
            description,
            dueDate,
            id: Date.now(),
            project: projects.getProjectName(array)
        }
       
    }

    const addToTaskArray = (task, array) => {
        array.push(task);
    }

    const getTaskFromArray = (id, array) => {

        const task = array.find(obj => {

            for (const prop in obj) {
                
                if (obj[prop] == id) {
                    return obj;
                }
            }
        });
        return task;
    }

    const saveTaskInArray = (id, details, array) => {   
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
            dueDate: details[2]
        }
    
        const task = array[index];
        
        for (const prop in detailsObj) {
            task[prop] = detailsObj[prop];
        }
    }

    const deleteFromArray = (id, array) => {    
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