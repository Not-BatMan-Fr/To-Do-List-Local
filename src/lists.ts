import { Task } from './types/Task.interface';

class TaskList {
  private static listOfTasks: Task[] = [];

  static addInList(task: Task): void {
    TaskList.listOfTasks.push(task);
  }

  static removeFromList(findTask: Task): boolean {
    const foundIndex = TaskList.findTaskIndex(findTask);
    
    if (foundIndex !== -1) {
      TaskList.listOfTasks.splice(foundIndex, 1);
      return true;
    }
    return false;
  }

  private static findTaskIndex(findTask: Task): number {
    for (let i = 0; i < TaskList.listOfTasks.length; i++) {
      const task = TaskList.listOfTasks[i];
      if (Object.keys(findTask).every(key => 
        task[key as keyof Task] === findTask[key as keyof Task]
      )) {
        return i;
      }
    }
    return -1;
  }

  static getAllTasks(): Task[] {
    return [...TaskList.listOfTasks];
  }
}

export default TaskList;