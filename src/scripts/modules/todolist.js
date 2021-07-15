import { projects } from './projects.js';
import { isToday, isThisWeek, parseISO } from 'date-fns';

let toDoList = {
    displayAll() {
        let allArray = [];

        const projNames = projects.getProjectNames();

        projNames.forEach(proj => {
            
            projects[proj].forEach(obj => {
                allArray.push(obj);
            });            
        });
          
        allArray = this.sortByInputTime(allArray);

        return allArray;
    },

    displayToday() {
        let todayArray = [];

        const projNames = projects.getProjectNames();

        projNames.forEach(proj => {
            
            projects[proj].forEach(obj => {
                
                if (isToday(parseISO(obj.dueDate))) {
                    todayArray.push(obj);
                }

            });
        });

        todayArray = this.sortByInputTime(todayArray);
          
        return todayArray;
    },

    displayWeek() {
        let weekArray = [];

        const projNames = projects.getProjectNames();

        projNames.forEach(proj => {
            
            projects[proj].forEach(obj => {
                
                if (isThisWeek(parseISO(obj.dueDate))) {
                    weekArray.push(obj);
                }

            });
        });

        weekArray = this.sortByInputTime(weekArray);
          
        return weekArray;
    },

    sortByInputTime(array) {
        array.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          
        return array;
    }

};

export { toDoList };
