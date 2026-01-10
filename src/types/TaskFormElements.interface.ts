export interface TaskFormElements {
  taskForm: HTMLFormElement;
  title: HTMLInputElement;
  description: HTMLInputElement;
  dueDate: HTMLInputElement;
  priority: HTMLSelectElement;
  actionButtons: [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
}