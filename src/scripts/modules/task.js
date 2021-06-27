const newTask = (name, description, priority, dueDate) => {
    const obj = Object.create(proto);

    obj.name = name
    obj.description = description
    obj.priority = priority
    obj.dueDate = dueDate

    console.log(obj);

    return obj;
}

const proto = {
    changeName() {

    }
}

export { newTask }