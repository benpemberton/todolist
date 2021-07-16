const projects = {

    newProject(name) {
        this[name] = [];
    },

    getProjectName(array) {
        for (const prop in projects) {
            if (projects[prop] === array) {
                return prop;
            }
        }
    },

    getProjectNames() {
        const names = [];

        for (const prop in projects) {
            if (typeof projects[prop] === 'object') {
                names.push(prop);
            }
        }
        return names;
    },

    getProjIndex(project) {
        const projNames = this.getProjectNames();
    
        if (projNames.length > 0) {
            let index = projNames.findIndex(name => {
                if (name === project) {
                    return true;
                }
            });
    
            return index;
        }
    }

};

export { projects }