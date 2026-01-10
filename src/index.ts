import { createTask, loadData } from './task';
import './style.css';

window.onload = loadData;

const addTaskButton = document.querySelector('#addTask');
if (addTaskButton) {
  addTaskButton.addEventListener('click', createTask);
} else {
  console.error('Add task button not found');
}

console.log("Application initialized");