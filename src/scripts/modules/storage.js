import { projects } from './projects.js';
import { addTaskBtnHandler, saveBtnHandler } from './app.js'
import taskFunctions from './task.js';

const storage = {

    addTask(task) {
        if (localStorage[task.project]) {

            let tempArray = JSON.parse(localStorage.
                getItem(`${task.project}`));
    
            taskFunctions.addToTaskArray(task, tempArray);

            console.log(tempArray);
    
            localStorage.setItem(`${task.project}`, 
                JSON.stringify(tempArray));
    
            console.log(localStorage);

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

        console.log(localStorage);
    }
}

export { storage };