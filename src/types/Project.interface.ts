import { Task } from './Task.interface';

export interface IProject {
  name: string;
  tasks: Task[];
}