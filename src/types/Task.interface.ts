import { Priority } from './Priority.enum';

export interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}