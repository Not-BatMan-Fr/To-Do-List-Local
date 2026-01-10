import edit from './assets/edit.png';
import save from './assets/save.png';
import del from './assets/trash.png';
import taskList from '../src/lists';

function createTask() {
    const taskForm = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('select');
    const optionDefaultPriority = document.createElement('option')
    const optionHighPriority = document.createElement('option')
    const optionNormalPriority = document.createElement('option')
    const optionLowPriority = document.createElement('option')
    const actionButtons = addActionButtons(taskForm);

    setAttributes(title, {
        "type": "text",
        "name": "title",
        "placeholder": "Task"
    });

    setAttributes(description, {
        "type": "text",
        "name": "description",
        "placeholder": "Description"
    });

    setAttributes(dueDate, {
        "type":"datetime-local",
        "name": "dueDate",
        "placeholder": "Due Date",
        "value": "",
        "required": true
    });

    setAttributes(priority, {
        "name": "priority",
        "required": true
    });

    setAttributes(optionDefaultPriority, {
        "disabled": true,
        "selected": true,
        "hidden": true,
        "value": ""
    });

    optionDefaultPriority.textContent = "Priority";
    optionHighPriority.setAttribute("value", "High");
    optionNormalPriority.setAttribute("value", "Normal");
    optionLowPriority.setAttribute("value", "Low");
    optionHighPriority.textContent = "High";
    optionNormalPriority.textContent = "Normal";
    optionLowPriority.textContent = "Low";

    priority.append(optionDefaultPriority, optionHighPriority, optionNormalPriority, optionLowPriority);
    taskForm.append(title, description, dueDate, priority, actionButtons[0], actionButtons[1], actionButtons[2]);
    document.querySelector('#tasksContainer').appendChild(taskForm);

    return { taskForm, title, description, dueDate, priority, actionButtons };
}

function addActionButtons(form) {
    
    const saveButton = document.createElement('button');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    
    setAttributes(saveButton, {
        'class': 'save',
        'type': 'submit'
    });
    setAttributes(editButton, {
        'hidden': true,
        'class': 'edit',
        'type': 'submit'
    });
    setAttributes(deleteButton, {
        'class': 'delete',
        'type': 'button'
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        taskList.addInList(formDataObject);
        for(const child of form.children){
            if(child.tagName != 'BUTTON')
                child.setAttribute('disabled', true);
        }
        editButton.hidden = false;
        saveButton.setAttribute('hidden', true);
        console.log(taskList.getAllTasks());
        storeTasks(taskList.getAllTasks());
    });

    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        for(const child of form.children)
            child.disabled = false;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        taskList.removeFromList(formDataObject);
        editButton.hidden = true;
        saveButton.hidden = false;
    });

    deleteButton.addEventListener('click', () => {
        if(confirm("Delete for sure?")) {
            for(const child of form.children)
                child.disabled = false;
            const formData = new FormData(form);
            const formDataObject = Object.fromEntries(formData.entries());
            taskList.removeFromList(formDataObject);
            form.innerHTML = '';
            form.remove();
            storeTasks(taskList.getAllTasks());
        }
    });

    const saveIcon = document.createElement('img');
    const editIcon = document.createElement('img');
    const delIcon = document.createElement('img');
    saveIcon.src = save;
    saveIcon.alt = 'save';
    saveButton.appendChild(saveIcon);
    editIcon.src = edit;
    editIcon.alt = 'edit';
    editButton.appendChild(editIcon);
    delIcon.src = del;
    delIcon.alt = 'delete';
    deleteButton.appendChild(delIcon);

    return [saveButton, editButton, deleteButton];
}

function setAttributes(element, attributes) {
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function storeTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    document.querySelector('#tasksContainer').innerHTML = '';
    for(const task of tasks) {
        taskList.addInList(task);
        const taskFields = createTask();
        populateValues(taskFields, task);
        disableFields(taskFields);
        taskFields.actionButtons[0].hidden = true;
        taskFields.actionButtons[1].hidden = false;
    };
}

function populateValues(target, source) {
    target.title.value = source.title;
    target.description.value = source.description;
    target.dueDate.value = source.dueDate;
    target.priority.value = source.priority;
}

function disableFields(fieldSet) {
    fieldSet.title.disabled = true;
    fieldSet.description.disabled = true;
    fieldSet.dueDate.disabled = true;
    fieldSet.priority.disabled = true;
}


export { createTask, loadData };