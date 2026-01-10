import { Task } from './types/Task.interface';
import { IProject } from './types/Project.interface';
import edit from './assets/edit.png';
import save from './assets/save.png';

class Project implements IProject {
  name: string;
  tasks: Task[];

  constructor(name: string) {
    this.name = name;
    this.tasks = [];
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getTasks(): Task[] {
    return this.tasks;
  }

  addTask(newTask: Task): void {
    this.tasks.push(newTask);
  }

  removeTask(taskIndex: number): boolean {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}

function createProject(): void {
  const projectContainer = document.querySelector('#projectContainer');
  
  if (!projectContainer) {
    console.error('Project container not found');
    return;
  }

  const project = document.createElement('form');
  const projectName = document.createElement('input');

  setAttributes(project, {
    id: 'Project1',
    class: 'project'
  });

  setAttributes(projectName, {
    id: 'ProjectName1',
    class: 'project',
    name: 'name',
    placeholder: 'Project Name',
    type: 'text',
    value: 'Project_1'
  });

  const actionButtons = addSaveEditButtons();
//   addEvents(project, actionButtons);
  addEvents(project);

  project.append(projectName, actionButtons[0], actionButtons[1]);
  projectContainer.appendChild(project);

  const taskSection = document.querySelector('#taskSection');
  if (taskSection) {
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('id', 'project-tasks-1');
    taskSection.appendChild(taskContainer);
  }
}

function addSaveEditButtons(): [HTMLButtonElement, HTMLButtonElement] {
  const saveButton = document.createElement('button');
  const editButton = document.createElement('button');

  setAttributes(saveButton, {
    class: 'save project',
    type: 'submit'
  });
  
  setAttributes(editButton, {
    hidden: 'true',
    class: 'edit project',
    type: 'button'
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

// function addEvents(form: HTMLFormElement, buttons: [HTMLButtonElement, HTMLButtonElement]): void {
function addEvents(form: HTMLFormElement): void {
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    
    if (typeof name === 'string') {
      storeProject(name);
    }
  });
}

function setAttributes(element: HTMLElement, attributes: Record<string, string>): void {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function storeProject(name: string): void {
  const project = new Project(name);
  console.log(project.name);
  localStorage.setItem('Project', JSON.stringify(project));
}

export { Project, createProject };