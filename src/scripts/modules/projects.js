const projects = {
    general: [],

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
    }

};

export { projects }