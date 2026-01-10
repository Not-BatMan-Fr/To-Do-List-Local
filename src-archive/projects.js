// const { LibManifestPlugin } = require("webpack");

class Project {
    constructor(name) {
        this.name = name;
    }

    get getName() {
        return this.name;
    }

    set setName(name) {
        this.name = name;
    }
    
    get getTasks() {
        return this.task;
    }

    addTask(newTask) {
        this.task.push(newTask);
    }

    removeTask(taskIndex) {
        if(taskIndex >= 0 && taskIndex < this.task.length)
            this.task.splice(taskIndex, 1);
    }

}

function createProject() {

    const projectContainer = document.querySelector('#projectContainer');
    const project = document.createElement('form');
    const projectName = document.createElement('input');//.focus();

    setAttributes(project, {
        'id': 'Project1',
        'class': 'project'
    });
    
    setAttributes(projectName, {
        'id': 'ProjectName1',
        'class': 'project',
        'name': 'name',
        'placeholder': 'Project Name',
        'type': 'text',
        'value': 'Project_1'
    });

    const actionButtons = addSaveEditButtons();
    addEvents(project, actionButtons);

    project.append(projectName, actionButtons[0], actionButtons[1]);
    projectContainer.appendChild(project);

    const taskSection = document.querySelector('#taskSection');
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('id', ``);
    taskSection.appendChild(taskContainer);
}

function addSaveEditButtons() {
    
    const saveButton = document.createElement('button');
    const editButton = document.createElement('button');
    
    setAttributes(saveButton, {
        'class': 'save project',
        'type': 'submit'
    });
    setAttributes(editButton, {
        'hidden': true,
        'class': 'edit project',
        'type': 'button'
    });

    const saveIcon = document.createElement('img');
    const editIcon = document.createElement('img');

    saveIcon.src = save;
    saveIcon.alt = 'save';
    saveButton.appendChild(saveIcon);    
    editIcon.src = edit;
    editIcon.alt = 'edit';
    editButton.appendChild(editIcon);

    return [saveButton, editButton];
}

function addEvents(form, buttons) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        // const formDataObject = Object.fromEntries(formData.entries());
        storeProject(name);
        // console.log(formData);
        // console.log(name);
        // console.log(formDataObject);
    });
}

function setAttributes(element, attributes) {
    for(let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function storeProject(name) {
    const project = new Project(name);
    console.log(project.name);
    localStorage.setItem('Project', JSON.stringfy(project));
}