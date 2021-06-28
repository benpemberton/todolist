const newTask = (name, description, priority, dueDate) => {
    const obj = Object.create(proto);

    obj.name = name
    obj.description = description
    obj.priority = priority
    obj.dueDate = dueDate
    obj.id = Date.now();

    return obj;
}

const proto = {
    sayHello() {

    }
}

export { newTask }