const projects = {
    general: [],

    newProject(name) {
        this[name] = [];
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