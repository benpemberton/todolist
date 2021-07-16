import { projects } from './projects.js';
import taskFunctions from './task.js';

const storage = {

    addTask(task) {
        if (localStorage[task.project]) {

            let tempArray = JSON.parse(localStorage.
                getItem(`${task.project}`));
    
            taskFunctions.addToTaskArray(task, tempArray);
    
            localStorage.setItem(`${task.project}`, 
                JSON.stringify(tempArray));

        } else {

            localStorage.setItem(`${task.project}`, 
            JSON.stringify([task]));

        }
    },

    editTask(id, details, array) {
        const task = taskFunctions.getTaskFromArray(id, array);

        let tempArray = JSON.parse(localStorage.
                getItem(`${task.project}`));

        taskFunctions.saveTaskInArray(id, details, tempArray);

        localStorage.setItem(`${task.project}`, 
            JSON.stringify(tempArray));
    },

    deleteTask(id, array) {
        const task = taskFunctions.getTaskFromArray(id, array);

        let tempArray = JSON.parse(localStorage.
                getItem(`${task.project}`));

        taskFunctions.deleteFromArray(id, tempArray);

        localStorage.setItem(`${task.project}`, 
            JSON.stringify(tempArray));
    },

    retrieveTasks() {
        const methods = ['length', 'clear', 'key', 'setItem', 
        'getItem', 'removeItem'];

        for (const proj in localStorage) {

            if (!(methods.includes(proj))) {

                let storedArray = JSON.parse(localStorage.
                    getItem(`${proj}`));

                projects.newProject(proj);

                storedArray.forEach(task => {
                    projects[proj].push(task);
                });
            }
        }
    },

    deleteProject(project) {
        localStorage.removeItem(`${project}`);
    }
}

export { storage };