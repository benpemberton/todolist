import { projects } from './projects.js';

let toDoList = {
    displayAll() {
        let allArray = [];

        const projNames = projects.getProjectNames();

        projNames.forEach(proj => {
            projects[proj].forEach(obj => {
                allArray.push(obj);
            });
        });

        allArray.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          
        return allArray;
    },


};

export { toDoList };
